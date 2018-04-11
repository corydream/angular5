import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export interface ApiUrl {
  rapApi: string;
}

import {
  API_ROOT
} from './../core.contants';

@Injectable()
export class ApiConfig {
    private configBaseUrl: string;
    public config: ApiUrl;
    constructor() {
    }
    public getConfig(key: string): string {
        return this.config[key];
    }
    public load(): any  {
      this.config = API_ROOT;
      return this.config;
    }
}

