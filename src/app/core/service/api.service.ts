import {
  Injectable,
  Inject
} from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CookieService } from './cookie';
import { ApiConfig, ApiUrl } from './config.api';
import { HttpInterceptorService } from './http-interceptor';
import { HTTP_OPTIONS } from './../core.contants';

@Injectable()
export class ApiService {
  baseUrl = '';
  ApiUrl: ApiUrl;
  constructor(
    private http: HttpClient,
    private cookieSer: CookieService,
    private apiConfig: ApiConfig,
    // tslint:disable-next-line:no-shadowed-variable
    private HttpInterceptorService: HttpInterceptorService
  ) {
    this.ApiUrl = this.apiConfig.load();
    // console.log(this.ApiUrl)
    // console.log('HttpInterceptorService', HttpInterceptorService);
  }
  /**
   * 设置服务器地址，如 http://localhost:3000
   *
   * @param {string} url
   * @returns
   * @memberof ApiService
   */
  setBaseUrl(url: string) {
    this.baseUrl = url;
    return this;
  }
  /**
   * post方法
   * @param {string} url  请求地址
   * @param {string} body
   * @param {RequestOptionsArgs} [options]
   * @param {boolean} [hideLoading]
   * @returns {Observable<any>} 返回可观察对象
   * @memberof ApiService
   */
  post(url: string, body?: any, options?: {
    headers?: HttpHeaders;
    params?: HttpParams;
    responseType?: 'json';
    withCredentials?: boolean;
  }, hideLoading?: boolean): Observable<any> {
    let _options = this.setRequiresOptions(options);
    return this.http.post(this.getFullUrl(url), body ? body : {}, _options);
  }
  /**
   * get方法
   * @param url 必填，路径地址
   * @param body 查询条件
   * @param options 请求参数自定义
   * @returns {Observable<>}
   */
  get(url: string, body?: any, options?: {
    headers?: HttpHeaders;
    params?: HttpParams;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    let _options = this.setRequiresOptions(options);
    let serchParam = this.parseParams(body);
    _options = Object.assign(_options, {
      params: serchParam
    });
    return this.http.get(this.getFullUrl(url), _options);
  }

  parseParams(params: any): HttpParams {
    let ret = new HttpParams();
    if (params) {
      // tslint:disable-next-line:forin
      for (const key in params) {
        let _data = params[key];
        ret = ret.set(key, _data);
      }
    }
    return ret;
  }
  setRequiresOptions(options: {
    headers?: HttpHeaders;
    params?: HttpParams;
    responseType?: 'json';
    withCredentials?: boolean;
  }) {
    var _default = HTTP_OPTIONS ? HTTP_OPTIONS : {};
    // tslint:disable-next-line:curly
    if (!options) return _default;
    return Object.assign(_default, options);
  }

  /**
   * Build API url
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    // return full URL to API here
    return this.ApiUrl.rapApi + this.baseUrl + url;
  }
}
