import { ApiConfig } from './../../core/service/config.api';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './../../core/service/api.service';

@Injectable()
export class NormalTaskService {
  constructor(private api: ApiService) {
    // this.api.setBaseUrl('appmagmt');
  }

  // 获取任务列表数据
  listData(name?: string): Observable<any> {
    return this.api.setBaseUrl('xwork').post(`/query/workFlowList`, name);
  }
  //运行
  taskRunInterface(name?: object): Observable<any> {
    return this.api.setBaseUrl('xwork').post(`/instance/start`, name);
  }
  taskSubmitInterface(name?: string): Observable<any> {
    return this.api.setBaseUrl('xwork').get(`/remote/submit?workFlowNames=${name}`);
  }
  taskDelete(name?: string): Observable<any> {
    return this.api.setBaseUrl('xwork').post(`/config/delete`, name);
  }
  workNameList(name?: string): Observable<any> {
    return this.api.setBaseUrl('xwork').post(`/name`, name);
  }
  saveWork(name?: any): Observable<any> {
    return this.api.setBaseUrl('xwork').post(`/flow/insert`, name);
  }
  //获取状态列表
  listStatus(name?: string): Observable<any> {
    return this.api.setBaseUrl('xwork').post(`/query/workFlowInstanceForStatus`, name);
  }
  taskKill(name?: object): Observable<any> {
    return this.api.setBaseUrl('xwork').post(`/instance/dokill`, name);
  }
  taskReset(name?: object): Observable<any> {
    return this.api.setBaseUrl('xwork').post(`/instance/resume`, name);
  }
  taskStatusDelete(name?: string): Observable<any> {
    return this.api.setBaseUrl('xwork').post(`/workFlowInstance/delete`, name);
  }
  //  运行情况列表
  listRun(name?: string): Observable<any> {
    return this.api.setBaseUrl('xwork').get(`/action/instance?instanceid=${name}`);
  }
  //  配置信息
  configInfo(name?: string): Observable<any> {
    return this.api.setBaseUrl('xwork').get(`/config/workFlow?instanceid=${name}`);
  }
  // 日志信息
  noteInfo(name?: string, size?: number): Observable<any> {
    return this.api.setBaseUrl('xwork').get(`/logs?instanceid=${name}&size=${size}`);
  }
  //  重启
  resetView(name?: string): Observable<any> {
    return this.api.setBaseUrl('xwork').get(`/resume/action?id=${name}`);
  }
  //  路径列表
  path(name?: string): Observable<any> {
    return this.api.setBaseUrl('hdfs').post(`/file/dir`, name);
  }
  upload(name?: string): Observable<any> {
    return this.api.setBaseUrl('hdfs').post(`/file/upload`, name);
  }
  // //
  // apiPost(url: string, body: Object): Observable<any> {0
  //   return this.api.setBaseUrl('appmagmt').post(url, body);
  // }

  // // 激活/禁用
  // toggleData(id: string): Observable<any> {
  //   return this.api.setBaseUrl('appmagmt').get(`/app/toggle?id=${id}`);  
  // }
  // // 搜索
  // searchData(body: Object): Observable<any> {
  //   return this.api.setBaseUrl('appmagmt').post('/app/search', body);
  // }
  // // 删除
  // deleteData(body: string): Observable<any> {
  //   return this.api.setBaseUrl('appmagmt').post('/app/delete', body);
  // }
}
