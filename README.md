# 前言

基于angular5.x开发，作为angular的一个实践项目，基本逻辑比较简单，基本都是数据展示，对于自己了解模块依赖有些帮助。

## 预设环境

- environment.ts 默认环境，开发时候使用
- environment.inner.ts 测试环境，打包发布到测试环境时使用
- environment.prod.ts 生产环境，打包到正式环境中使用

## 目录说明


## 技术栈

angular@5.0 + angular/router@5.0.0 + ng-zorro-antd@0.6.1 + rxjs@5.5.2 + font-awesome@4.7.0 + zone.js@0.8.14 + 

### src/app

项目默认载入基础架构，提供了应用程序的基础架构：

包括核心模块，特性分支模块，共享模块

如果构建的时候设置了ant，默认会引入ant组件库，以及公司内扩展的组件库；


## 官方文档库

- [angular中文](https://angular.cn/)
- [rxjs中文](http://cn.rx.js.org/)
- [typescript中文](https://www.tslang.cn/)


## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，建议使用 node 最新LTS版

```
git clone https://github.com/corydream/angular5.git

cd angular5 （进入当前的项目）

npm install  (安装依赖包)

npm start (运行本地开发环境)

npm run build (打包)

## 开发环境以及工具

开发语言：typescript
开发工具推荐使用Visual Studio Code

#### Visual Studio Code 常用插件推荐

| 名称  | 作用  |
| ------------ | ------------ |
|  tslint |  TSLint是一种可扩展的静态分析工具，用于检查TypeScript代码的可读性，可维护性和功能错误。它被现代编辑器和构建系统广泛支持，可以通过您自己的lint规则，配置和格式化程序进行定制。 |
|  Beautify  | 美化 javascript, JSON, CSS, Sass, HTML |
|  Beautify css/sass/scss/less  |  Beautify 同系列的工具，扩展了美化的文件范围 |
|  Document This  | 自动化生成js的注释详情 |
|  Git Log  |  查看git日志信息 |
| Git Lens  | GitLens增强了内置的Visual Studio代码Git功能。它可以帮助您通过Git责任注释和代码镜头一目了然地编写代码作者身份，无缝浏览和浏览文件或分支的历史记录，通过强大的比较命令获得有价值的见解等等。|
| Git Project Manager | 使得你能方便快捷的打开一个git仓库的目录 |
| Angular TypeScript Snippets | 让你更快捷的写angular的代码 |
