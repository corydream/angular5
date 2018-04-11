import { ApiConfig } from './../../core/service/config.api';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from './../../core/service/api.service';

@Injectable()
export class TimeTaskService {
  constructor(private api: ApiService) { }

  // 获取任务列表数据
  listData(name?: string): Observable<any> {
    return this.api.setBaseUrl('scheduler').post(`/query/schedulerConfig`, name);
  }
  //获取定时任务状态数据
  listStatus(name?: string): Observable<any> {
    return this.api.setBaseUrl('scheduler').post(`/query/schedulerInstance`, name);
  }
  queryScheduler(name?: string): Observable<any> {
    return this.api.setBaseUrl('scheduler').get(`/query/bundle/schedulerName?schedulerName=${name}`);
  }
  // id
  queryID(name?: string): Observable<any> {
    return this.api.setBaseUrl('scheduler').get(`/query/bundle/ID?instance=${name}`);
  }
  // actions
  queryActions(name?: object): Observable<any> {
    return this.api.setBaseUrl('scheduler').post(`/query/bundle/actions`, name);
  }
  // workflow
  queryWorkFlow(name?: string): Observable<any> {
    return this.api.setBaseUrl('scheduler').get(`/query/workFlowName?workFlowName=${name}`);
  }
  // 右侧actions
  queryActionsRight(name?: string): Observable<any> {
    return this.api.setBaseUrl('scheduler').get(`/query/bundle/actionsRight?flowName=${name}`);
  }
  // 保存实例
  saveworks(name?: object): Observable<any> {
    return this.api.setBaseUrl('scheduler').post(`/insert`, name);
  }
  startworks(name?: object): Observable<any> {
    return this.api.setBaseUrl('scheduler').post(`/start`, name);
  }
  //calendar
  calendar(name?: object): Observable<any> {
    return this.api.setBaseUrl('scheduler').post(`/query/status/calendar`, name);
  }
  scheduler(name?: object): Observable<any> {
    return this.api.setBaseUrl('scheduler').get(`/query/status/scheduler?schedulerInstance=${name}`);
  }
  config(name?: string): Observable<any> {
    return this.api.setBaseUrl('scheduler').get(`/query/status/log?schedulerInstance=${name}`);
  }
  note(name?: string, size?: number): Observable<any> {
    return this.api.setBaseUrl('scheduler').get(`/query/logs?schedulerInstance=${name}&size=${size}`);
  }
  //批量删除
  deleteAllTime(name?: string): Observable<any> {
    return this.api.setBaseUrl('scheduler').post(`/batchDelete`, name);
  }
  // kill任务
  killtime(name?: string): Observable<any> {
    return this.api.setBaseUrl('scheduler').get(`/dokill?schedulerInstanceid=${name}`);
  }
  // reset任务
  resettime(name?: string): Observable<any> {
    return this.api.setBaseUrl('scheduler').get(`/resume?schedulerInstanceid=${name}`);
  }
}
