import { Injectable } from '@angular/core';

@Injectable()
export abstract class AbstractTableComponent {
    _pageIndex = 1;
    _pageSize = 10;
    _dataSet = [];
    _displayData: Array<any> = [];
    _total = 0;
    _current = 1;
    _allChecked = false;
    _indeterminate = false;
    count: number = 0; //计数count
    _keyword: string;
    _loading: boolean = true;
    _dateRange: Array<any>;
    _deleteArr: Array<any>; //存储删除多个任务时数据的数组
    _dataSetconf = [];
    _ispage = false;
    notesize = 0; //返回的日志条数

    _refreshStatus() {
        const allChecked = this._displayData.every(value => value.checked === true);
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = !allChecked && !allUnChecked;
        this.count = this._dataSet.filter(value => value.checked).length;
    }

    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => (data.checked = true));
        } else {
            this._displayData.forEach(data => (data.checked = false));
        }
        this._refreshStatus();
    }
    _syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return match;
        });
    }
    _trim(s) {
        return s.replace(/(^\s*)/g, "");
    }
}
