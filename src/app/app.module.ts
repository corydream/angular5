import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingMoudele } from './app.routing';

import { AppComponent } from './app.component';
import { PageModule} from './features/page.module';

import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingMoudele,
    BrowserModule,
    CommonModule,
    NgZorroAntdModule,
    PageModule,
    CoreModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [[{provide: LocationStrategy, useClass: HashLocationStrategy}]],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor( ) {
  }
}
