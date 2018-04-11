export const TaskList: Array<any> = [{
    title: '任务名称'
},
{
    title: '描述'
},
{
    title: '最近更新人'
},
{
    title: 'cron'
},
{
    title: '任务创建时间'
},
{
    title: '最近更新时间'
},
{
    title: '开始时间'
},
{
    title: '结束时间'
},
{
    title: '操作'
}
];
export const StatusList: Array<any> = [{
    title: '任务名称',
    index: 0
}, {
    title: '开始时间',
    index: 1
}, {
    title: '执行人',
    index: 2
}, {
    title: '远程',
    index: 3
}, {
    title: '任务ID',
    index: 4
}, {
    title: '结束时间',
    index: 5
},
{
    title: '任务创建时间',
    index: 6
},
{
    title: '最近更新时间',
    index: 7
}, {
    title: '状态',
    index: 8
}, {
    title: '操作',
    index: 9
}];
export const statusTimeArr: Array<any> = [{
    name: '发布',
    state: 'DISTRIBUTED'
},
{
    name: '等待',
    state: 'PENDING'   
},
{
    name: '运行中',
    state: 'RUNNING'   
},
{
    name: '成功',
    state: 'SUCCESS'   
},
{
    name: '失败',
    state: 'FAILED'   
},
{
    name: '终止',
    state: 'KILLED'   
},
{
    name: '重启',
    state: 'RESUME'
}];
