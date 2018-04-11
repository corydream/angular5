import { Component, OnInit } from '@angular/core';
import { TaskList } from './../normal-task.mock';
import { NormalTaskService } from './../normal-task.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AbstractTableComponent } from '../../common/abstract-table.component';
import { HomeArgsComponent } from './../home/home-args/home-args.component';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent extends AbstractTableComponent implements OnInit {
  taskListItem: number = 0;
  searchPlaceHolder: string = '输入搜索任务关键词';
  // 表单相关
  _allChecked: boolean = false;
  _indeterminate = false;
  _dataSet = [];
  tablelist = []; //表头字段循环
  _displayData = [];
  _multOpts: boolean = false; // 标识是否多选
  pageArr: any = {};
  constructor(
    private _api: NormalTaskService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    super();
  }

  ngOnInit() {
    this.tablelist = TaskList;
    this._refreshTables();
  }
  // // 全选及刷新表单相关
  // _displayDataChange($event) {
  //   this._displayData = $event;
  //   this._refreshStatus();
  // }
  searchBtn() {
    this.pageArr.keyword = this._keyword;
    if (this._dateRange) {
      this.pageArr.beginDate = this._dateRange[0];
      this.pageArr.endDate = this._dateRange[1];
    }
    this._refreshTables();
  }
  // 刷新表格数据
  _refreshTables(reset = false) {
    if (reset === true) {
      this._pageIndex = 1;
    }
    this._dataSet = [];
    this.pageArr.currentPage = this._pageIndex;
    this.pageArr.pageSize = this._pageSize;
    this._api.listData(this.pageArr).subscribe(data => {
      this._loading = false;
      if (data) {
        this._total = data.totalCount;
        this._dataSet = data.listData;
        this._displayData = data.listData;
        this._indeterminate = false;
        this._allChecked = false;
      } else {
        this.message.error('请求异常,请重试');
      }
    });
    // this._refreshStatus();
  }
  taskRun() {
    if (this.count == 1) {
      this._displayData.forEach(data => {
        if (data.checked) {
          const subscription = this.modalService.open({
            title: data.flowName,
            content: HomeArgsComponent,
            width: 600,
            footer: false,
            componentParams: {
              arrs: {
                arrs: JSON.parse(data.requestObj).argsArr,
                name: data.flowName
              },
            }
          });
          // this._api.taskRunInterface({ 'flowName': data.flowName }).subscribe(res => {
          //   if (res.status == 200) {
          //     this.message.success('运行成功');
          //   } else {
          //     this.message.error('运行失败');
          //   }
          // });
        }
      });
    }
  }
  taskSubmit() {
    if (this.count == 1) {
      this._displayData.forEach(data => {
        if (data.checked) {
          this._api.taskSubmitInterface(data.flowName).subscribe(res => {
            if (res.status == 200) {
              this.message.success('提交成功');
              this._refreshTables();
            } else {
              this.message.error('提交失败');
            }
          });
        }
      });
    }
  }
  deleteAll() {
    this._deleteArr = [];
    let _deleteStr: any = {};
    this._displayData.forEach(data => {
      if (data.checked) {
        this._deleteArr.push(data.flowName);
      }
    });
    // if (this._deleteArr.length > 0) {
    //   _deleteStr = JSON.stringify(this._deleteArr).split('[')[1].split(']')[0];
    // }
    _deleteStr.list = this._deleteArr;
    this._api.taskDelete(_deleteStr).subscribe(res => {
      if (res.status == 200) {
        this.message.success('删除成功');
        this._refreshTables();
      } else {
        this.message.error('删除失败');
      }
    });
  }
}
