import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayeTicketPageRoutingModule } from './paye-ticket-routing.module';

import { PayeTicketPage } from './paye-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayeTicketPageRoutingModule
  ],
  declarations: [PayeTicketPage]
})
export class PayeTicketPageModule {}
