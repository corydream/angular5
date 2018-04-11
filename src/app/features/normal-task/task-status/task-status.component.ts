import { Component, OnInit } from '@angular/core';
import { finishList, statusArr } from './../normal-task.mock';
import { NormalTaskService } from './../normal-task.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AbstractTableComponent } from '../../common/abstract-table.component';
@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.less', './../normal-task.component.less']
})
export class TaskStatusComponent extends AbstractTableComponent implements OnInit {

  taskListItem = 0;
  searchPlaceHolder = '名称/任务id/执行人';
  // 表单相关
  _allChecked = false;
  _indeterminate = false;
  _dataSet = [];
  taskMetaList = []; //表头项
  //  状态项
  statusList = [];
  _displayData = [];
  pageArr: any = {};
  _multOpts = false; // 标识是否多选
  constructor(
    private _api: NormalTaskService,
    private message: NzMessageService
  ) {
    super();
  }

  ngOnInit() {
    this.taskMetaList = finishList;
    this.statusList = statusArr;
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
  // 终止任务操作
  killTask() {
    if (this.count == 1) {
      this._displayData.forEach(data => {
        if (data.checked) {
          if (data.status != 'SUCCESS') {
            this._api.taskKill({ 'list': data.instanceid }).subscribe(res => {
              if (res.status == 200) {
                this.message.success('终止任务成功');
              } else {
                this.message.error('终止任务失败');
              }
            });
          } else {
            this.message.error('已运行成功的任务不能终止');
          }
        }
      });
    }
  }
  // 重启任务
  resetTask() {
    if (this.count == 1) {
      this._displayData.forEach(data => {
        if (data.checked) {
            this._api.taskReset({ 'deleteQueryObject': data.instanceid }).subscribe(res => {
              if (res.status == 200) {
                this.message.success('重启成功');
              } else {
                this.message.error('重启失败');
              }
            });
        }
      });
    }
  }
  // 删除任务
  deleteTask() {
    this._deleteArr = [];
    let _deleteStr: any = {};
    this._displayData.forEach(data => {
      if (data.checked) {
        this._deleteArr.push(data.instanceid);
      }
    });
    // if (this._deleteArr.length > 0) {
    //   _deleteStr = JSON.stringify(this._deleteArr).split('[')[1].split(']')[0];
    // }
    _deleteStr.list = this._deleteArr;
    this._api.taskStatusDelete(_deleteStr).subscribe(res => {
      if (res.status == 200) {
        this.message.success('删除成功');
        this._refreshTables();
      } else {
        this.message.error('删除失败');
      }
    });
  }
  // 切换普通任务状态下的导航
  // changeTask(index) {
  //   this.taskNav.map((v, i) => {
  //     index == i ? v.active = true : v.active = false;
  //   });
  //   this.taskListItem = index;
  //   this._checkAll(false);
  // }
}
