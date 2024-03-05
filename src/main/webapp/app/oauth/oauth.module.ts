import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboundComponent } from './inbound/inbound.component';
import { RouterModule } from '@angular/router';
import { OutboundComponent } from './outbound/outbound.component';

@NgModule({
  declarations: [InboundComponent, OutboundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'inbound',
        component: InboundComponent,
        data: {
          pageTitle: 'OAuth Inbound',
        },
      },
      {
        path: 'outbound',
        component: OutboundComponent,
        data: {
          pageTitle: 'OAuth Outbound',
        },
      },
    ]),
  ],
})
export class OauthModule {}
