import { Component, OnInit, Input } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { HomePathComponent } from './../home-path/home-path.component';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
  styleUrls: ['./home-add.component.less']
})
export class HomeAddComponent implements OnInit {
  _type: any;
  _disabled: boolean = false;
  _path: string;
  // job: string;
  // dir: string;
  // rep: string;
  // shell: string;
  options = [];
  selectedOption;
  addObj: any;
  total: number = 1;
  @Input() set type(value) {
    this._type = value;
  }
  constructor(
    private subject: NzModalSubject,
    public modalService: NzModalService,
  ) { }

  ngOnInit() {
    if (typeof (this._type.arguArr == 'undefined')) {
      // this._type.arguArr = [{
      //   index: 0,
      //   key: '',
      //   value: '',
      //   actionName: ''
      // }];
      this._type.arguArr = [];
    }
    this._type.typeNum <= 3 ? this._disabled = false : this._disabled = true;
    if (this._type.selectArr) {
      this._type.selectArr = JSON.parse(this._type.selectArr);
      this._type.selectArr.map(v => {
        this.options.push({ value: v.actionName, label: v.actionName });
        this.selectedOption = this.options[0];
      });
    } else if (this._type.hasOwnProperty('item')) {
      this._path = this._type.item.text._path;
      // this.shell = this._type.item.text.shell;
      // this.job = this._type.item.text.job;
      // this.dir = this._type.item.text.dir;
      // this.rep = this._type.item.text.rep;
      this._type['arguArr'] = this._type.item.text.arguArr;
    }
  }
  addDrag(args) {
    if (args.arguArr.length > 0) {
      this._type.arguArr[0].actionName = args.type;
    }
    this.addObj = {
      _type: this._type.type,
      _path: this._path,
      // job: this.job,
      // dir: this.dir,
      // rep: this.rep,
      // shell: this.shell,
      arguArr: this._type.arguArr
    };
    this.subject.next(this.addObj);
    this.subject.destroy('onCancel');
  }
  addArgs(args) {
    args.arguArr.push({
      index: this.total++,
      key: '',
      value: '',
      actionName: this._type.type
    });
  }
  minusArgs(item, args) {
    args.arguArr.map((v, i) => {
      if (i == item) {
        args.arguArr.splice(i, 1);
      }
    });
  }
  // 选择路径
  choosePath() {
    const subscription = this.modalService.open({
      title: '选择路径',
      content: HomePathComponent,
      width: 800,
      footer: false,
      zIndex: 100,
      componentParams: {
        path: this._path
      }
    });
    subscription.subscribe(data => {
      if (data.path) {
        this._path = data.path;
      }
    });
  }
}
