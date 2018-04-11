import { Component, OnInit } from '@angular/core';
import { StatusList, statusTimeArr } from './../time-task.mock';
import { TimeTaskService } from './../time-task.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AbstractTableComponent } from '../../common/abstract-table.component';
@Component({
  selector: 'app-time-status',
  templateUrl: './time-status.component.html',
  styleUrls: ['./time-status.component.less', './../time-list/time-list.component.less']
})
export class TimeStatusComponent extends AbstractTableComponent implements OnInit {

  taskListItem: number = 0;
  searchPlaceHolder: string = '名称/任务id/执行人';
  // 表单相关
  _allChecked: boolean = false;
  _indeterminate = false;
  _dataSet = [];
  _displayData = [];
  statusArgs = [];
  pageArr: any = {};
  statusTimeArgs = [];
  _multOpts: boolean = false; // 标识是否多选
  constructor(
    private _api: TimeTaskService,
    private message: NzMessageService
  ) {
    super();
  }

  ngOnInit() {
    this.statusArgs = StatusList;
    this.statusTimeArgs = statusTimeArr;
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
    this._api.listStatus(this.pageArr).subscribe(data => {
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
  }
  //  切换任务状态
  changeStatus(state) {
    this.pageArr.status = state;
    this._refreshTables();
  }
  // 查询按钮
  searchBtn() {
    this.pageArr.keyword = this._keyword;
    if (this._dateRange) {
      this.pageArr.beginDate = this._dateRange[0];
      this.pageArr.endDate = this._dateRange[1];
    }
    this._refreshTables();
  }
  // // 删除任务
  deleteTask() {
    this._deleteArr = [];
    let _deleteStr: any = {};
    this._displayData.forEach(data => {
      if (data.checked) {
        this._deleteArr.push(data.instanceid);
      }
    });
  }
  // 终止任务操作
  killTask() {
    if (this.count == 1) {
      this._displayData.forEach(data => {
        if (data.checked) {
          if (data.status == 'RUNNING') {
            this._api.killtime(data.instanceid).subscribe(res => {
              if (res.status == 200) {
                this.message.success('终止任务成功');
              } else {
                this.message.error('终止任务失败');
              }
            });
          } else {
            this.message.error('不能终止任务');
          }
        }
      });
    }
  }
  //重启任务
  resetTask() {
    if (this.count == 1) {
      this._displayData.forEach(data => {
        if (data.checked) {
          this._api.resettime(data.instanceid).subscribe(res => {
            if (res.status == 200) {
              this.message.success('重启任务成功');
            } else {
              this.message.error('重启任务失败');
            }
          });
        }
      });
    }
  }
}
