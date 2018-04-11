import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-time-task',
  templateUrl: './time-task.component.html',
  styleUrls: ['./time-task.component.less']
})
export class TimeTaskComponent implements OnInit {
  menu: Array<any> = [{
    name: '定时任务列表',
    route: 'list',
    active: true
  },
  {
    name: '定时任务状态',
    route: 'status',
    active: false
  }];
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }

}
