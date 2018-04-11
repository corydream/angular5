import { Component, OnInit, Input } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { NormalTaskService } from './../../normal-task.service';
@Component({
  selector: 'app-home-args',
  templateUrl: './home-args.component.html',
  styleUrls: ['./../home-add/home-add.component.less']
})
export class HomeArgsComponent implements OnInit {
  arr: any;
  name: string;
  @Input() set arrs(value) {
    this.arr = value.arrs;
    this.name = value.name;
    console.log(value);
  }
  constructor(
    private subject: NzModalSubject,
    private message: NzMessageService,
    private _api: NormalTaskService
  ) { }

  ngOnInit() {

  }
  run() {
    this._api.taskRunInterface({ 'workFlowConfig': this.arr, 'workFlowName': this.name }).subscribe(res => {
      if (res.status == 200) {
        this.message.success('运行成功');
      } else {
        this.message.error('运行失败');
      }
    });
    // this.subject.next(this.arr);
    this.subject.destroy('onCancel');
  }
}
