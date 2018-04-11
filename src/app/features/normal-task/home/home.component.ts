import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { ApiService } from './../../../core/service/api.service';
// import './../../../../assets/layer.js';
import * as jsp from 'jsplumb';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HomeAddComponent } from './home-add/home-add.component';
import { HomeArgsComponent } from './home-args/home-args.component';
import { ActivatedRoute } from '@angular/router';
import { NormalTaskService } from './../normal-task.service';
import { mockData } from './home.mock';
// declare var layer: any;
declare var Array: any;
// tslint:disable-next-line:class-name
export interface flowChartItem {
  index: number;
  offset: object;
  text: any;
  type: string;
  isHide: boolean;
  typeNum?: string;
  selectArr?: string;
}
// tslint:disable-next-line:class-name
export interface flowchartConnectItem {
  start: string;
  end: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
  inputValue: string = '';  // 查询左侧列表名
  flowChartArr: flowChartItem[];
  flowchartConnect: flowchartConnectItem[];
  jsPlumb = jsp.jsPlumb;
  instance: any;
  count = 0;
  taskName: string;
  leftNameList: any;
  taskDesc: string;
  _current: number = 1;
  _pageTotal: number;
  _lineArr = [];
  _conLine = {};
  routeName: string = '';
  pageArr: any = {};
  saveTarget = false; //是否保存成功
  connectorPaintStyle = {
    strokeWidth: 2,
    stroke: '#61B7CF',
    joinstyle: 'round',
    outlineStroke: 'white',
    outlineWidth: 2
  };

  connectorHoverStyle = {
    strokeWidth: 3,
    stroke: '#216477',
    outlineWidth: 5,
    outlineStroke: 'white'
  };
  endpointHoverStyle = {
    fill: '#216477',
    stroke: '#216477'
  };
  // the definition of source endpoints (the small blue ones)
  sourceEndpoint = {
    endpoint: 'Dot',
    paintStyle: {
      stroke: '#7AB02C',
      fill: 'transparent',
      radius: 5,
      strokeWidth: 1
    },
    isSource: true,
    isTarget: false,
    connector: ['StateMachine', { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
    connectorStyle: this.connectorPaintStyle,
    hoverPaintStyle: this.endpointHoverStyle,
    connectorHoverStyle: this.connectorHoverStyle,
    dragOptions: {},
    overlays: [
      ['Label', {
        location: [0.5, 1.5],
        label: 'Drag',
        cssClass: 'endpointSourceLabel',
        visible: false
      }]
    ],
    maxConnections: -1
  };
  // the definition of target endpoints (will appear when the user drags a connection)
  targetEndpoint = {
    endpoint: 'Dot',
    paintStyle: { fill: '#7AB02C', radius: 5 },
    hoverPaintStyle: this.endpointHoverStyle,
    maxConnections: -1,
    dropOptions: { hoverClass: 'hover', activeClass: 'active' },
    isSource: false,
    isTarget: true,
    overlays: [
      ['Label', { location: [0.5, -0.5], label: 'Drop', cssClass: 'endpointTargetLabel', visible: false }]
    ]
  };
  basicType = {
    connector: 'StateMachine',
    paintStyle: { stroke: 'red', strokeWidth: 4 },
    hoverPaintStyle: { stroke: 'blue' },
    overlays: [
      'Arrow'
    ]
  };
  constructor(
    public renderer: Renderer2,
    public el: ElementRef,
    public modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private _api: NormalTaskService,
    private message: NzMessageService
  ) {
  }
  @ViewChild('targetContent') targetContent: any;
  getInstance() {
    this.instance = this.jsPlumb.getInstance({
      // default drag options
      DragOptions: { cursor: 'pointer', zIndex: 2000 },
      // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
      // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
      ConnectionOverlays: [
        ['Arrow', {
          location: 1,
          visible: true,
          width: 11,
          length: 11,
          id: 'ARROW',
          events: {
            click: function () {
              alert('you clicked on the arrow overlay');
            }
          }
        }],
        ['Label', {
          location: 0.1,
          id: 'label',
          cssClass: 'aLabel',
          events: {
            // tap: function () {
            //   const label = prompt('请输入标签文字：');
            //   this.setLabel(label);
            // }
          }
        }]
      ],
      Container: 'canvas'
    });
  }
  ngOnInit() {
    this.getInstance();
    this.saveTarget = false;
    // this.workNameList();
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.routeName = queryParams.name;
      console.log(this.routeName);
    });
    // 初始化左边菜单
    if (this.routeName) {
      this.pageArr.keyword = this.routeName;
      this._api.listData(this.pageArr).subscribe(data => {
        if (data) {
          // console.log(JSON.parse(data.listData[0].requestObj));
          this.taskName = this.routeName;
          this.taskDesc = data.listData[0].description;
          this.flowChartArr = JSON.parse(data.listData[0].requestObj).blockArr;
          this.flowchartConnect = JSON.parse(data.listData[0].requestObj).lineArr;
        } else {
          this.message.error('请求异常,请重试');
        }
        this.count = this.flowChartArr.length + 1;
      });
    } else {
      setTimeout(_ => {
        this.flowChartArr = [
          { index: 1, type: 'start', isHide: true, offset: { top: 0, left: 0 }, text: { _type: "START" } },
          { index: 2, type: 'end', isHide: true, offset: { top: 500, left: 600 }, text: { _type: "END" } }
        ];
        this.flowchartConnect = [
          // { start: "Window1BottomCenter", end: "Window2TopCenter" },
          // { start: "Window1BottomCenter", end: "Window3TopCenter" },
          // { start: "Window3BottomCenter", end: "Window4TopCenter" },
          // { start: "Window2BottomCenter", end: "Window4TopCenter" },
          // { start: "Window4BottomCenter", end: "Window5TopCenter" }
        ];
        this.count = this.flowChartArr.length;
      });
    }

    setTimeout(() => {
      this.batch();
      this.addEndpoints();
      this.addconnect();
    }, 100);

  }
  workNameList() {
    this.pageArr.currentPage = 1;
    this.pageArr.pageSize = 5;
    this.pageArr.workFlowName = this.inputValue;
    this._api.workNameList(this.pageArr).subscribe(data => {
      if (data) {
        this.leftNameList = data.listData;
      }
    });
  }
  addEndpoints() {
    for (let i = 0; i < this.flowChartArr.length; i++) {
      // this.addEndpointItem(this.flowChartArr[i].type, this.flowChartArr[i].index);
      this.addEndpointItem(this.flowChartArr[i].type, this.flowChartArr[i].index, this.flowChartArr[i].text['_type']);
    }
  }
  addEndpointItem(type: string, index: number, name: string) {
    switch (type) {
      case 'start':
        this._addEndpoints(`Window${index}`, ['BottomCenter'], [], name);
        break;
      case 'end':
        this._addEndpoints(`Window${index}`, [], ['TopCenter'], name);
        break;
      case 'rectangle':
        this._addEndpoints(`Window${index}`, ['BottomCenter'], ['TopCenter'], name);
        break;
    }
  }
  addconnect() {
    for (let i = 0; i < this.flowchartConnect.length; i++) {
      this.instance.connect({ uuids: [this.flowchartConnect[i].start, this.flowchartConnect[i].end], editable: true });
    }
  }
  init(connection) {
    connection.getOverlay('label').setLabel(connection.sourceId.substring(15) + '-' + connection.targetId.substring(15));
  }
  batch() {
    let _this = this;
    _this.instance.registerConnectionType('basic', this.basicType);
    _this.instance.batch(function () {
      _this.instance.bind('connection', function (connInfo, originalEvent) {
        if (connInfo.connection.sourceId == connInfo.connection.targetId) {
          _this.jsPlumb.detach(connInfo);
          // layer.msg('不能连接自己！', { icon: 2 });
        }
        // _this.init(connInfo.connection);
      });
      // 拖动
      _this.instance.draggable(_this.jsPlumb.getSelector('.flowchart-demo .jtk-node'), { grid: [20, 20] });
      _this.instance.bind('click', function (conn, originalEvent) {
        console.log(conn);
        _this.instance.detach(conn);
      });
      // _this.instance.bind('connectionDrag', function (connection) {
      //   // console.log('connection ' + connection.id + ' is being dragged. suspendedElement is ', connection.suspendedElement, ' of type ', connection.suspendedElementType);
      //   // console.log(connection) 
      // });
      // _this.instance.bind('connectionDragStop', function (connection) {
      //   // console.log(connection)        
      // });
      // _this.instance.bind('connectionMoved', function (params) {
      //   console.log(params);
      //   console.log('connection ' + params.connection.id + ' was moved');
      // });
    });
    this.jsPlumb.fire('jsPlumbDemoLoaded', this.instance);
  }
  _addEndpoints(toId, sourceAnchors, targetAnchors, name) {

    for (let i = 0; i < sourceAnchors.length; i++) {
      const sourceUUID = toId + sourceAnchors[i];
      this.instance.addEndpoint('flowchart' + toId, this.sourceEndpoint, {
        anchor: sourceAnchors[i], uuid: sourceUUID, name: name
      });
    }
    for (let j = 0; j < targetAnchors.length; j++) {
      const targetUUID = toId + targetAnchors[j];
      this.instance.addEndpoint('flowchart' + toId, this.targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID, name: name });
    }
  }
  //
  allowDrop(event) {
    event.preventDefault();
  }
  drag(event, type, typeNum, selectArr, arguArr) {
    event.dataTransfer.setData('mark', event.target.getAttribute('data-mark'));
    event.dataTransfer.setData('targetId', event.target.parentElement.nextElementSibling.id);
    event.dataTransfer.setData('type', type);   // 获取容器id
    event.dataTransfer.setData('typeNum', typeNum); //获取容器序号
    event.dataTransfer.setData('arguArr', arguArr);
    if (selectArr) {
      event.dataTransfer.setData('selectArr', selectArr.actions);
    }
  }
  drop(event) {
    event.preventDefault();
    let mark = event.dataTransfer.getData("mark");
    let targetId = event.dataTransfer.getData("targetId");
    console.log(event);
    if (targetId == 'canvas') {
      switch (mark) {
        case 'square':
          this.prompt(event, 'square');
          break;
        case 'start':
          this.addFlowChartStartOrEnd('start', event);
          break;
        case 'end':
          this.addFlowChartStartOrEnd('end', event);
          break;
        case 'rhombus':
          this.prompt(event, 'rhombus');
          break;
        case 'rectangle':
          this.prompt(event, 'rectangle');
          break;
      }
    }
  }
  prompt(event, str) {
    let _this = this;
    let type = event.dataTransfer.getData("type");
    let typeNum = event.dataTransfer.getData("typeNum");
    let selectArr = event.dataTransfer.getData('selectArr');
    let arguArr = event.dataTransfer.getData('arguArr');
    let types = {
      type: type,
      typeNum: typeNum,
      selectArr: selectArr,
      arguArr: arguArr
    };

    const subscription = _this.modalService.open({
      title: type,
      content: HomeAddComponent,
      width: 600,
      footer: false,
      zIndex: 99,
      componentParams: {
        type: types
      }
    });
    subscription.subscribe(data => {
      if (data._type) {
        _this.count++;
        _this.addFlowChartOther(data, event, str, typeNum, selectArr);
      }
    });

    // layer.prompt(function (val, index) {
    //   console.log(event, val ,str);
    //   layer.close(index);
    //   _this.count++;
    //   _this.addFlowChartOther(val, event, str);
    // });
  }
  /**
   * 添加 长方形 正方形 菱形
   * @param val  内容
   * @param event 
   * @param str  
   */
  addFlowChartOther(text: any, event: Event, type: string, typeNum?: string, selectArr?: string,
  ) {
    const obj: flowChartItem = {
      index: this.count,
      type: type,
      text: text,
      selectArr: selectArr,
      typeNum: typeNum,
      offset: {
        top: event['layerY'] - 40,
        left: event['layerX'] - 40
      },
      isHide: true
    };
    this.flowChartArr.push(obj);
    setTimeout(() => {
      this.addEndpointItem(type, this.count, text._type);
      // this.draggable(this.count);
      this.draggable(this.count, text._type);
    });
  }
  /**
   * 添加 开始和结束
   * @param val 
   * @param event 
   */
  addFlowChartStartOrEnd(type: string, event: Element) {
    this.count++;
    const obj: flowChartItem = {
      index: this.count,
      type: type,
      text: '',
      offset: {
        top: event['layerY'] - 40,
        left: event['layerX'] - 40
      },
      isHide: true
    };
    this.flowChartArr.push(obj);
    console.log(event);
    setTimeout(() => {
      this.addEndpointItem(type, this.count, '');
      this.draggable(this.count, '');
    });

  }
  /**
   * 开启拖拽
   */
  draggable(id, str) {
    this.instance.draggable(this.jsPlumb.getSelector(`#flowchartWindow${id}`), { grid: [20, 20] });
  }
  /**
   * 保存
   */
  save() {
    this.targetContent.nativeElement.childNodes.forEach(element => {
      if (element.nodeName === "DIV") {
        let className = element.getAttribute('class');
        if (className.indexOf('jtk-node') > -1) {
          let id = element.getAttribute('id').substr(15);
          this.flowChartArr.forEach(item => {
            if (item.index == id) {
              // tslint:disable-next-line:radix
              item.offset['top'] = parseInt(element.style.top);
              // tslint:disable-next-line:radix
              item.offset['left'] = parseInt(element.style.left);
            }
          });
        }
      }
    });
    const list = this.instance.getAllConnections(); //获取所有的链接
    let sourceIdArr = [];
    this.flowchartConnect = [];
    // tslint:disable-next-line:forin
    for (var i in list) {
      this.flowchartConnect.push({
        start: `${list[i]['sourceId'].substring(9)}BottomCenter`,
        end: `${list[i]['targetId'].substring(9)}TopCenter`
      });
      this.flowChartArr.map(v => {
        if (list[i]['sourceId'].substring(15) == v.index) {
          list[i]['sourceId'] = v.text['_type'];
        }
        if (list[i]['targetId'].substring(15) == v.index) {
          list[i]['targetId'] = v.text['_type'];
        }
      });
      sourceIdArr.push(list[i]['sourceId']);
    }
    // console.log(sourceIdArr);
    const setArr = Array.from(new Set(sourceIdArr));
    let relations = {};
    setArr.forEach(element => {
      relations[element] = {
        "actionName": element,
        "children": [],
        "fathers": []
      };
      list.forEach(item => {
        if (item['sourceId'] == element) {
          relations[element]['children'].push(item['targetId']);
        }
        if (item['targetId'] == element) {
          relations[element]['fathers'].push(item['sourceId']);
        }
      });
    });
    let endArr = [];
    for (let t in relations) {
      if (relations[t].children) {
        relations[t].children.map(v => {
          if (v == 'END') {
            endArr.push(relations[t].actionName);
          }
        });
      }
    }
    relations['END'] = {
      "actionName": 'END',
      "children": [],
      "fathers": endArr
    };
    // console.log(relations);
    this._conLine = relations;
    // var last = (last = Object.keys(relations))[last.length - 1];
    // this.flowchartConnect = relations;
  }
  // removeEndpoint(item: flowChartItem) {
  //   var _this = this;
  //   layer.confirm('确定删除吗?', {
  //     btn: ['确定', '取消'], //按钮
  //     icon: 3, title: '提示'
  //   }, function (index) {
  //     _this.flowChartArr.forEach((v, i) => {
  //       if (v.index == item.index) {
  //         _this.flowChartArr.splice(i, 1);
  //       }
  //     });
  //     _this.instance.removeAllEndpoints(`flowchartWindow${item.index}`);
  //     layer.close(index);
  //   });
  // }
  editEndpoint(item: flowChartItem) {
    // let _this = this;
    const subscription = this.modalService.open({
      title: item.text['_type'],
      content: HomeAddComponent,
      width: 600,
      zIndex: 99,
      footer: false,
      componentParams: {
        type: {
          type: item.text['_type'],
          typeNum: item.typeNum,
          selectArr: item.selectArr,
          item: item
        }
      }
    });
    subscription.subscribe(data => {
      if (data._type) {
        this.flowChartArr.forEach((v, i) => {
          if (v.index == item.index) {
            v.text['_type'] = data._type;
            v.text['_path'] = data._path;
            // v.text['dir'] = data.dir;
            // v.text['job'] = data.job;
            // v.text['rep'] = data.rep;
            v.text['shell'] = data.shell;
          }
        });
      }
    });
    console.log(this.flowChartArr);
    // layer.prompt({ title: `编辑标题-${item.text}`, value: `${item.text}`}, function (val, index) {
    //   _this.flowChartArr.forEach((v, i) => {
    //     if (v.index == item.index) {
    //       v.text = val;
    //     }
    //   });
    //   layer.close(index);
    // });
  }
  dataSource(args) {
    // 数据处理
    mockData.descriptors = [];
    this.flowChartArr.map(v => {
      if (v.typeNum == '1') {
        mockData.descriptors.push({
          "actionName": v.text['_type'],
          "actionType": "NORMORL",
          "clazz": "com.banggood.xwork.action.impl.HiveAction",
          "configs": {
            "parameters": {
              "HSql.Path": {
                "content": v.text['_path'],
                "required": true,
                "setContent": true,
                "type": "STRING"
              }
            }
          }
        });
      } else if (v.typeNum == '2') {
        console.log(v);
        mockData.descriptors.push(
          {
            "actionName": v.text['_type'],
            "actionType": "NORMORL",
            "clazz": "com.banggood.xwork.action.impl.ShellAction",
            "configs": {
              "parameters": {
                "path": {
                  "content": {
                    "env": v.text['_path']
                  },
                  "required": false,
                  "setContent": true,
                  "type": "MAP"
                },
                // "xwork.shell.command": {
                //   "content": v.text['shell'],
                //   "required": true,
                //   "setContent": true,
                //   "type": "STRING"
                // }
              }
            }
          });
      } else if (v.typeNum == '3') {
        mockData.descriptors.push({
          "actionName": v.text['_type'],
          "actionType": "NORMORL",
          "clazz": "com.banggood.xwork.action.impl.KettleAction",
          "configs": {
            "parameters": {
              "path": {
                "content": v.text['_path'],
                "required": true,
                "setContent": true,
                "type": "STRING"
              }
    
            }
          }
        });
      }
    });

    this.save(); // 存储连线关系
    mockData.requestObj = {
      blockArr: this.flowChartArr,
      relatArr: this._conLine,
      lineArr: this.flowchartConnect,
      argsArr: args
    };
    mockData.flowName = this.taskName;
    mockData.relations = this._conLine;
    mockData.description = this.taskDesc;
    let argsArr = [];
    this.flowChartArr.map(v => {
      if (v.type == 'rectangle') {
        argsArr.push(...v.text.arguArr);
      }
    });
    mockData.paramsJson = argsArr;
  }
  runTask() {
    let argsArr = [];
    mockData.requestObj['argsArr'] = [];
    this.flowChartArr.map(v => {
      if (v.type == 'rectangle') {
        argsArr.push(...v.text.arguArr);
        mockData.requestObj['argsArr'] = argsArr;
      }
    });
    // this.saveTask(argsArr);
    if (this.saveTarget) {
      const subscription = this.modalService.open({
        title: mockData.flowName,
        content: HomeArgsComponent,
        width: 600,
        footer: false,
        componentParams: {
          arrs: {
            arrs: argsArr,
            name: this.taskName
          },

        }
      });
    } else {
      this.message.error('请先保存');
    }
  }
  saveTask(args) {
    this.dataSource(args);
    if (!this.taskName) {
      this.message.error('请输入任务名称');
      return;
    }
    this._api.saveWork({ 'workFlowConfig': mockData }).subscribe(res => {
      if (res.status == 200) {
        this.message.success('保存成功');
        this.saveTarget = true;
      } else {
        this.message.error(res.desc);
      }
    });
  }
  confirm(item: flowChartItem) {
    let _this = this;
    _this.flowChartArr.forEach((v, i) => {
      if (v.index == item.index) {
        _this.flowChartArr.splice(i, 1);
      }
    });
    _this.instance.removeAllEndpoints(`flowchartWindow${item.index}`);
  }
  cancel() {

  }
}












