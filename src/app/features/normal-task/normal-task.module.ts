import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NormalTaskComponent } from './normal-task.component';
import { NormalTaskRoutingModule } from './normal-task.routing';
import { NzTableModule, NzInputModule, NzPopconfirmModule, NzButtonModule, NzDatePickerModule, NzTimePickerModule, NzCheckboxModule, NzPopoverModule, NzMessageModule, NzMessageService} from 'ng-zorro-antd';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { NormalTaskService } from './normal-task.service';
import { ViewComponent } from './view/view.component';
const dependModule = [
  NzInputModule,
  NzButtonModule,
  NzDatePickerModule,
  NzTableModule,
  NzTimePickerModule,
  NzCheckboxModule,
  NzPopoverModule,
  NzMessageModule,
  NzPopconfirmModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NormalTaskRoutingModule,
    HomeModule,
    ...dependModule
  ],
  declarations: [NormalTaskComponent, TaskListComponent, TaskStatusComponent, HomeComponent,
    ViewComponent
],
  providers: [NormalTaskService, NzMessageService]
})
export class NormalTaskModule { }

