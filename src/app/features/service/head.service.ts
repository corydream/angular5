import { Injectable } from '@angular/core';


interface ITEM {
  title: string;
  route: string;
  active: boolean;
}

export const HEAD_LIST: [ITEM] = [
  {
    title: '普通任务',
    route: 'normal-task',
    active: true
  },
  {
    title: '定时任务',
    route: 'time-task',
    active: false
  }
];

@Injectable()
export class HeadService {
  list: [ITEM];
  constructor() {
    this.list = HEAD_LIST;
  }

  get(): [ITEM] {
    return this.list;
  }
}
