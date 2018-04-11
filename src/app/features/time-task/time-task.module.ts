import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NormalTaskComponent } from './normal-task.component';
import { TimeTaskComponent } from './time-task.component';
import { TimeTaskRoutingModule } from './time-task.routing';
import { TimeTaskService } from './time-task.service';
import { NzTableModule, NzInputModule, NzButtonModule, NzDatePickerModule, NzTimePickerModule, NzCheckboxModule, NzPopoverModule, NzMessageModule, NzMessageService, NzSelectModule} from 'ng-zorro-antd';
import { TimeListComponent } from './time-list/time-list.component';
import { TimeStatusComponent } from './time-status/time-status.component';
import { NewTimeComponent } from './new-time/new-time.component';
import { NewStatusComponent } from './new-status/new-status.component';
const dependModule = [
  NzInputModule,
  NzButtonModule,
  NzDatePickerModule,
  NzTableModule,
  NzTimePickerModule,
  NzCheckboxModule,
  NzPopoverModule,
  NzMessageModule,
  NzSelectModule
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TimeTaskRoutingModule,
    ...dependModule
  ],
  declarations: [ TimeTaskComponent,
    TimeListComponent,
    TimeStatusComponent
,
    NewTimeComponent,
    NewStatusComponent
] ,
  providers: [ TimeTaskService, NzMessageService ]
})
export class TimeTaskModule { }

