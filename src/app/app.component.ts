import { CoreService } from './core/core.service';
import { Component, OnInit } from '@angular/core';

declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  title = 'app';
  constructor() {
  }
  ngOnInit(): void {

  }
}
