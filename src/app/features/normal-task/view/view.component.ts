import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { NormalTaskService } from './../normal-task.service';
import { AbstractTableComponent } from './../../common/abstract-table.component';
import { viewArr } from './view.mock';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.less']
})
export class ViewComponent extends AbstractTableComponent implements OnInit {
  routeInfo: any = {
    name: '',
    id: ''
  }; //获取路由信息
  currentItem: number = 0; //当前点击的index
  viewTableArr: Array<any>; // 列表表头
  configStr: any; // 配置信息
  noteStr = []; // 日志信息 
  navArr: Array<any> = [{
    index: 0,
    item: '运行情况',
    flag: true
  }, {
    index: 1,
    item: '配置',
    flag: false
  }, {
    index: 2,
    item: '日志',
    flag: false
  }];
  constructor(
    private activatedRoute: ActivatedRoute,
    private _api: NormalTaskService,
    private message: NzMessageService
  ) {
    super();
  }

  ngOnInit() {
    this.viewTableArr = viewArr;
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
      this._api.configInfo(this.routeInfo.id).subscribe(data => {
        if (data) {
          this._dataSetconf = data;
        } else {
          this.message.error('请求异常,请重试');
        }
      });
    } else if (this.currentItem == 2) {
      this._changeNote();
    }
  }
  _changeNote() {
    this._api.noteInfo(this.routeInfo.id, this.notesize).subscribe(data => {
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
    this._api.listRun(this.routeInfo.id).subscribe(data => {
      this._loading = false;
      if (data) {
        this._total = data.length;
        this._dataSet = data;
        this._displayData = data;
      } else {
        this.message.error('请求异常,请重试');
      }
    });
  }
  //重启操作
  reset(id, status) {
    if (status == 'DISTRIBUTED' || status == 'RUNNING') {
      this.message.error('该状态不能重启');
    } else {
      this._api.resetView(id).subscribe(data => {
        if (data.status == 200) {
          this.message.success(data.desc);
        } else {
          this.message.error(data.desc);
        }
      });
    }

  }
}
