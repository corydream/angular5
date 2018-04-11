import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

/* 环境配置 */
export const ENVIRONMENT = environment;

/* api接口配置 */
export const API_ROOT = environment.api;

/* 配置头部信息
{
    withCredentials: false
}
*/
export const HTTP_OPTIONS: {
    headers?: HttpHeaders;
    params?: HttpParams;
    responseType?: 'json';
    withCredentials?: boolean;
} = null; 
