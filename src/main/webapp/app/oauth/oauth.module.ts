import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboundComponent } from './inbound/inbound.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    InboundComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild([
      {
        path: 'inbound',
        component: InboundComponent,
        data: {
          pageTitle: 'OAuth Inbound',
        },
      },
    ]),
  ]
})
export class OauthModule { }
