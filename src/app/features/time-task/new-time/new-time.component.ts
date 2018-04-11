import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TimeTaskService } from './../time-task.service';
import * as moment from 'moment';
@Component({
  selector: 'app-new-time',
  templateUrl: './new-time.component.html',
  styleUrls: ['./new-time.component.less']
})
export class NewTimeComponent implements OnInit {
  routeInfo: any = {
    name: 'My Coordinator',
    desc: '任务描述…'
  }; //获取路由信息
  workFlowName: string = 'workflow…';
  workFlowOpts: string = '任务名称…';
  crontab: string;
  options = [];
  tempOptions = [];
  _checked: boolean;
  cover_workflow = true;
  _startDate: null;
  _endDate: null;
  _startTime = '';
  _endTime = '';
  _params: any = [];
  _bundles: any = [{
    remoteInstanceid: '',
    schedulerName: '',
    version: '',
    dependAction: '',
    _ActionsArrName: [],
    _scheduler: [],
    _IDArr: [],
    _actionsArr: [],
    _rightActionArr: []
  }];
  saveTarget = false; //是否保存成功
  constructor(
    private activatedRoute: ActivatedRoute,
    private _api: TimeTaskService,
    private message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.saveTarget = false;
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (!queryParams.name) {
        return;
      }
      this.routeInfo.name = queryParams.name;
      this.routeInfo.desc = queryParams.desc;
      this.refreshData(this.routeInfo.name);
    });
  }
  _Crontab(value) {

  }
  addArgs() {
    this._params.push({
      key: '',
      value: ''
    });
  }
  minusArgs(index) {
    if (this._params.length > 1) {
      this._params.map((v, i) => {
        if (i == index) {
          this._params.splice(i, 1);
        }
      });
    }
  }
  // 触发选择workflow
  changeWorkFlow(ev, name) {
    if (ev) {
      this._params = [];
      this.cover_workflow = false;
      this._api.queryWorkFlow('').subscribe(data => {
        if (data) {
          this.options = [];
          this.tempOptions = [];
          data.map(v => {
            this.options.push({
              label: v.flowName,
              value: v.flowName
            });
            this.tempOptions.push({
              flowName: v.flowName,
              paramJson: v.paramJson,
            });
          });
        } else {
          this.message.error('请求异常,请重试');
        }
      });
    } else {
      this.tempOptions.map(v => {
        if (v.flowName == name && v.paramJson) {
          this._params = JSON.parse(v.paramJson);
        }
      });
    }
  }
  // 触发下拉菜单的回调函数scheduler
  changeScheduler(ev, index, item) {
    if (ev) {
      this._api.queryScheduler('').subscribe(data => {
        if (data) {
          this._bundles[index]._scheduler = [];
          data.map(v => {
            this._bundles[index]._scheduler.push({
              label: v.schedulerName,
              value: v.instanceid
            });
          });
        } else {
          this.message.error('请求异常,请重试');
        }
      });
    }
  }
  // 触发id
  changeID(ev, index, item) {
    if (ev && item.remoteInstanceid) {
      this._api.queryID(item.remoteInstanceid).subscribe(data => {
        if (data) {
          this._bundles[index]._IDArr = [];
          data.map(v => {
            this._bundles[index]._IDArr.push({
              label: v.date,
              value: v.version
            });
          });
        } else {
          this.message.error('请求异常,请重试');
        }
      });
    }
  }
  changeActions(ev, index, item) {
    if (ev && item.version) {
      this._api.queryActions({ 'instanceid': item.remoteInstanceid, 'version': item.version }).subscribe(data => {
        if (data) {
          this._bundles[index]._actionsArr = [];
          data.map(v => {
            this._bundles[index]._actionsArr.push({
              label: v.actionName,
              value: v.actionName
            });
          });
        } else {
          this.message.error('请求异常,请重试');
        }
      });
    }
  }
  changeRightActions(ev, index, item) {
    if (ev && this.workFlowName) {
      this._api.queryActionsRight(this.workFlowName).subscribe(data => {
        if (data) {
          this._bundles[index]._rightActionArr = [];
          data.map(v => {
            this._bundles[index]._rightActionArr.push({
              label: v.actionName,
              value: v.actionName
            });
          });
        } else {
          this.message.error('请求异常,请重试');
        }
      });
    }
  }
  // 保存实例
  savework() {
    this._api.saveworks({ 'object': this.saveSource() }).subscribe(data => {
      if (data) {
        this.message.success('保存成功');
        this.saveTarget = true;
      } else {
        this.message.error('请求异常,请重试');
      }
    });
  }
  runTask() {
    if (this.saveTarget) {
      this._api.startworks({ "schedulerName": this.routeInfo.name, workFlowConfig: this._params }).subscribe(data => {
        if (data) {
          this.message.success('运行成功');
        } else {
          this.message.error(data.desc);
        }
      });
    } else {
      this.message.error('请先保存');
    }

  }
  // 触发actions
  addBundles(item, index) {
    this._bundles.push({
      remoteInstanceid: '',
      schedulerName: this.routeInfo.name,
      version: '',
      dependAction: '',
      _ActionsArrName: [],
      _scheduler: [],
      _IDArr: [],
      _actionsArr: [],
      _rightActionArr: []
    });
  }
  minusBundles(item, index) {
    if (this._bundles.length > 1) {
      this._bundles.map((v, i) => {
        if (i == index) {
          this._bundles.splice(i, 1);
        }
      });
    }
  }
  // save data
  saveSource() {
    this._bundles.map(v => {
      v.remoteActionStr = v._ActionsArrName.toString();
      v.schedulerName = this.routeInfo.name;
      v.reqObj = {
        _ActionsArrName: v._ActionsArrName,
        _scheduler: v._scheduler,
        _IDArr: v._IDArr,
        _actionsArr: v._actionsArr,
        _rightActionArr: v._rightActionArr,
        remoteActionStr: v.remoteActionStr,
        version: v.version
      };
    });
    let obj = {
      'bundles': this._bundles,
      'cron': this.crontab,
      'requestObj': this._params,
      'descript': this.routeInfo.desc,
      'workFlowName': this.workFlowName,
      'schedulerName': this.routeInfo.name,
      'startDate': this._checked ? moment(this._startDate).format('YYYY-MM-DD') + ' ' + moment(this._startTime).format('HH:mm:ss') : null,
      'endDate': this._checked ? moment(this._endDate).format('YYYY-MM-DD') + ' ' + moment(this._endTime).format('HH:mm:ss') : null,
    };
    return obj;
  }
  refreshData(name) {
    let obj: any = { 'keyword': name };
    let arr;
    this._api.listData(obj).subscribe(data => {
      if (data) {
        this._checked = true;
        arr = data.listData[0];
        this.crontab = arr.cron;
        this.workFlowName = arr.workFlowName;
        this._startDate = arr.startDate;
        this._startTime = arr.startDate;
        this._endDate = arr.endDate;
        this._endTime = arr.endDate;
        arr.bundles.length > 0 ? this._bundles = arr.bundles : this._bundles = this._bundles;

        this._bundles.map(v => {
          if (v.reqObj) {
            v.reqObj = JSON.parse(v.reqObj);
            v._ActionsArrName = v.reqObj._ActionsArrName;
            v._scheduler = v.reqObj._scheduler;
            v._IDArr = v.reqObj._IDArr;
            v._actionsArr = v.reqObj._actionsArr;
            v._rightActionArr = v.reqObj._rightActionArr;
            v.version = v.reqObj.version;
          }
        });
      } else {
        this.message.error('请求异常,请重试');
      }
    });
  }
}
