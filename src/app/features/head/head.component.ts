import { Component, OnInit } from '@angular/core';

import { HeadService } from './../service/head.service';
import { ApiService } from '../../core/service/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { hostname } from 'os';
@Component({
  selector: 'page-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.less'],
  providers: [HeadService]
})
export class HeadComponent implements OnInit {
  list: any[];
  pathName: string;
  username: string;
  constructor(private hdSer: HeadService, private apiSer: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.list = this.hdSer.get();
    if (this.list[1].route.indexOf(location.pathname.split('/')[2]) >= 0) {
      this.list[1].active = true;
      this.list[0].active = false;
    }
    this.route.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          this.list.map(v => {
            v.route.indexOf(event['url'].split('/')[2]) >= 0 ? v.active = true : v.active = false;
          });
        }
      });
  }

}
