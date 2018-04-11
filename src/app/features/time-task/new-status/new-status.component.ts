import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TimeTaskService } from './../time-task.service';
import { AbstractTableComponent } from './../../common/abstract-table.component';
import { viewArr, scheArr } from './new-status.mock';
@Component({
  selector: 'app-new-status',
  templateUrl: './new-status.component.html',
  styleUrls: ['./new-status.component.less']
})
export class NewStatusComponent extends AbstractTableComponent implements OnInit {
  routeInfo: any = {
    name: '',
    id: ''
  }; //获取路由信息
  currentItem: number = 0; //当前点击的index
  viewTableArr: Array<any>; // 列表表头
  scheArr: Array<any>; // 列表表头
  configStr: any; // 配置信息
  noteStr = []; // 日志信息
  schedulerArr: any; //scheduler list
  _dataSet1: any;
  _isPaging = false;
  _total1 = 10;
  navArr: Array<any> = [{
    index: 0,
    item: 'calendar',
    flag: true
  }, {
    index: 1,
    item: 'scheduler',
    flag: false
  }, {
    index: 2,
    item: '配置',
    flag: false
  }, {
    index: 3,
    item: '日志',
    flag: false
  }];
  constructor(
    private activatedRoute: ActivatedRoute,
    private _api: TimeTaskService,
    private message: NzMessageService
  ) {
    super();
  }

  ngOnInit() {
    this.viewTableArr = viewArr;
    this.scheArr = scheArr;
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.routeInfo.name = queryParams.name;
      this.routeInfo.id = queryParams.id;
    });
    this._refreshTables();
  }
  tabNav(index) {
    this.navArr.map((v, i) => {
      index == i ? v.flag = true : v.flag = false;
    });
    this.currentItem = index;
    if (this.currentItem == 1) {
      this._refreshTables1();

    } else if (this.currentItem == 2) {
      this._api.config(this.routeInfo.id).subscribe(data => {
        if (data) {
          this._dataSetconf = data;
        } else {
          this.message.error('请求异常,请重试');
        }
      });
    } else if (this.currentItem == 3) {
      this._changeNote();
    }
  }
  _changeNote() {
    this._api.note(this.routeInfo.id, this.notesize).subscribe(data => {
      if (data) {
        this.notesize = data.line;
        this.noteStr.push(...data.content);
        if (data.content.length == 0) { return false; }
        setTimeout(() => {
          this._changeNote();
        }, 500);
      } else {
        this.message.error('日志数据为空');
      }
    });
  }
  // 刷新表格数据
  _refreshTables(reset = false) {
    if (reset === true) {
      this._pageIndex = 1;
    }
    this._dataSet = [];
    this._api.calendar({ "schedulerInstance": this.routeInfo.id, 'currentPage': this._pageIndex, 'pageSize': this._pageSize }).subscribe(data => {
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
  _refreshTables1(reset = false) {
    if (reset === true) {
      this._pageIndex = 1;
    }
    this._dataSet1 = [];
    this._api.scheduler(this.routeInfo.id ).subscribe(data => {
      this._loading = false;
      if (data) {
        this._dataSet1 = data;
      } else {
        this.message.error('请求异常,请重试');
      }
    });
  }
}
