import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';


import { PageComponent } from './page.component';

const routes: Routes = [
  {
    path: 'page',
    component: PageComponent,
    children: [
      {
        path: '', redirectTo: 'normal-task', pathMatch: 'full'
      },
      {
        path: 'normal-task', loadChildren: './normal-task/normal-task.module#NormalTaskModule'
      },
      {
        path: 'time-task', loadChildren: './time-task/time-task.module#TimeTaskModule'
      }
    ]
  }

];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PageRoutingMoudele { }


