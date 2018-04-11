import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NormalTaskComponent } from './normal-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'list' 
  },
  {
    path: '',
    component: NormalTaskComponent,
    children: [{
      path: 'list',
      component: TaskListComponent
    }, {
      path: 'status',
      component: TaskStatusComponent
    }, {
      path: 'list/info',
      component: HomeComponent
    }, {
      path: 'status/view',
      component: ViewComponent
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NormalTaskRoutingModule { }

export const routedComponents = [NormalTaskComponent];
