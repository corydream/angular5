import { Component, OnInit } from '@angular/core';
import { Number } from 'core-js/library/web/timers';
import { Router } from '@angular/router';
@Component({
  selector: 'app-normal-task',
  templateUrl: './normal-task.component.html',
  styleUrls: ['./normal-task.component.less']
})
export class NormalTaskComponent implements OnInit {
  menu: Array<any> = [{
    name: '普通任务列表',
    route: `list`,
    active: true
  },
  {
    name: '普通任务状态',
    route: `status`,
    active: false
  }];
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    
  }
}
