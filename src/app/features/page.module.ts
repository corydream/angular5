import { CoreModule } from './../core/core.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { PageRoutingMoudele } from './page.routing';


import { PageComponent } from './page.component';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
    imports: [CommonModule, PageRoutingMoudele],
    exports: [],
    declarations: [
        PageComponent,
        HeadComponent,
        FooterComponent
],
})
export class PageModule { }
