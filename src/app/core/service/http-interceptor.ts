
import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';



import { HttpInterceptor } from '@angular/common/http';

/**
 * @export 返回拦截器类
 * onFinally 总是会执行的
 */
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {
  }
  intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    /* 设置全局的请求头 */

    const jwtReq = req.clone({

    });
    // console.log(req);
    return next.handle(jwtReq)
      .do((res: any) => {
      })
      .mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.status !== 200) {
          return Observable.create(observer => observer.error(event));
        }
        return Observable.create(observer => observer.next(event));
      })
      .catch((res: HttpResponse<any>) => {
        switch (res.status) {
          case 401:
            // 拦截到401错误
            break;
          case 200:
            // 业务层级错误处理
            if (res.body && res.body.status === 0) {
              console.log('业务层级错误处理');
            }
            break;
          case 404:
            console.log(res.body.status);
            break;
        }
        return Observable.throw({ res, 'error': '0' });
      });
  }
  private onSubscribeSuccess(res?: any) {
  }
  private onSubscribeError(error?: any) {
  }
  private onFinally(res?: any) {

  }
}

