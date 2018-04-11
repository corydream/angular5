import { Component, OnInit } from '@angular/core';
import { TimeTaskService } from './../time-task.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AbstractTableComponent } from './../../common/abstract-table.component';
import { TaskList } from './../time-task.mock';
@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.less']
})
export class TimeListComponent extends AbstractTableComponent implements OnInit {

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
    private _api: TimeTaskService,
    private message: NzMessageService
  ) {
    super();
  }

  ngOnInit() {
    this.tablelist = TaskList;
    this._refreshTables();
  }
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
          this._api.startworks({ 'schedulerName': data.schedulerName }).subscribe(res => {
            if (res.status == 200) {
              this.message.success('运行成功');
            } else {
              this.message.error('运行失败');
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
        this._deleteArr.push(data.schedulerName);
      }
    });
    _deleteStr.list = this._deleteArr;

    this._api.deleteAllTime(_deleteStr).subscribe(res => {
      if (res.status == 200) {
        this.message.success(res.desc);
        this._refreshTables();
      } else {
        this.message.error(res.desc);
      }
    });
  }
}
