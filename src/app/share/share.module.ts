/* 
shareModule引入了angular常用的模块，在特性模块中只需要引入这个模块就不必再次引入了
*/

import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SHARE_COMPONENTS } from './components/index';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ SHARE_COMPONENTS],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, HttpModule,SHARE_COMPONENTS]
})
export class ShareModule {
  constructor(@Optional() @SkipSelf() parentModule: ShareModule) {
    // if (parentModule) {
    //   throw new Error(
    //     '共享模块ShareModule已经引入，只允许在当前分支模块顶层导入共享模块');
    // }
  }
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: ShareModule,
          providers: []
      };
  }
}
