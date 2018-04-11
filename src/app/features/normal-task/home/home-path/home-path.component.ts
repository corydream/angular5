import { Component, OnInit, Input } from '@angular/core';
import { NormalTaskService } from './../../normal-task.service';
import { AbstractTableComponent } from './../../../common/abstract-table.component';
import { NzMessageService, NzModalService, NzModalSubject } from 'ng-zorro-antd';
@Component({
  selector: 'app-home-path',
  templateUrl: './home-path.component.html',
  styleUrls: ['./../home-add/home-add.component.less']
})
export class HomePathComponent extends AbstractTableComponent implements OnInit {
  pathArr: any = {
    currentPage: 1,
    pageSize: 10,
    path: ''
  };
  pathCrumbs = [''];
  //存储临时路径:
  pathUpload = '';
  @Input() set path(value) {
    if (value) {
      let arr = [];
      arr = value.split('/');
      arr.splice(arr.length - 1, 1);
      this.pathCrumbs = arr;
      this.pathArr.path = this.pathCrumbs.toString().replace(/,/g, '/');
    }
  }
  constructor(
    private _api: NormalTaskService,
    private _message: NzMessageService,
    private subject: NzModalSubject
  ) {
    super();
  }

  ngOnInit() {
    this.pathList(true, '');
    this.pathUpload = this._api['api'].ApiUrl.rapApi;
  }
  backPath(item, index) {
    this.pathCrumbs.map((v, i) => {
      if (v == item && index > 0) {
        this.pathCrumbs.splice(index, this.pathCrumbs.length - index);
      }
    });
    this.pathArr.path = this.pathCrumbs.toString().replace(/,/g, '/');
    this.pathList(true, '');
  }
  pathList(reset = false, item) {
    if (reset === true) {
      this._pageIndex = 1;
    }
    this._loading = false;
    if (!item.directory && item) {
      return false;
    } else {
      this._dataSet = [];
      this.pathArr.currentPage = this._pageIndex;
      this.pathArr.pageSize = this._pageSize;
      if (item.path) {
        this.pathArr.path = this.pathArr.path + '/' + item.path;
        this.pathCrumbs.push(item.path);
      }
      this._api.path(this.pathArr).subscribe(data => {
        if (data) {
          this._total = data.totalCount;
          this._dataSet = data.listData;
          this._displayData = data.listData;
        } else {
          this._message.error('请求异常,请重试');
        }
      });
    }
  }
  newPath(item) {
    if (!item.directory) {
      this.subject.next({ 'path': this.pathArr.path + '/' + item.path });
      this.subject.destroy('onCancel');
    }
  }
  change(ev) {
    if (ev.file.response) {
      if (ev.file.response.status == 200) {
        this._message.success(ev.file.response.desc);
      } else {
        this._message.error(ev.file.response.desc);
      }
    }
  }
}
