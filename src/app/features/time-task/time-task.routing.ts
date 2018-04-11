import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeTaskComponent } from './time-task.component';
import { TimeListComponent } from './time-list/time-list.component';
import { TimeStatusComponent } from './time-status/time-status.component';
import { NewTimeComponent } from './new-time/new-time.component';
import { NewStatusComponent } from './new-status/new-status.component';
const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'list' 
  },
  {
    path: '',
    component: TimeTaskComponent,
    children: [
      {
        path: 'list',
        component: TimeListComponent,
      },
      {
        path: 'status',
        component: TimeStatusComponent
      },
      {
        path: 'list/newtime',
        component: NewTimeComponent
      },
      {
        path: 'status/newstatus',
        component: NewStatusComponent
      }
      // {
      //   path: 'info',
      //   component: HomeComponent
      // }, {
      //   path: 'view',
      //   component: ViewComponent
      // }
    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TimeTaskRoutingModule { }

export const routedComponents = [TimeTaskComponent];
