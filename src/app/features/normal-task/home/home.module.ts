import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzModalService, NzMessageModule, NzModalModule, NzGridModule, NzInputModule, NzFormModule, NzSelectModule, NzPaginationModule, NzMessageService, NzTableModule, NzUploadModule } from 'ng-zorro-antd';
import { HomeAddComponent } from './home-add/home-add.component';
import { HomeArgsComponent } from './home-args/home-args.component';
import { HomePathComponent } from './home-path/home-path.component';
@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzMessageModule,
    NzInputModule,
    NzGridModule,
    FormsModule,
    NzFormModule,
    NzSelectModule,
    NzPaginationModule,
    NzTableModule,
    NzUploadModule
    
  ],
  declarations: [ 
    HomeAddComponent,
    HomeArgsComponent,
    HomePathComponent
],
  providers: [NzModalService, NzMessageService],
  entryComponents: [HomeAddComponent, HomeArgsComponent, HomePathComponent] 
})
export class HomeModule { 
  constructor() {
  }
}
