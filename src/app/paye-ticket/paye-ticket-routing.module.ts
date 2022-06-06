import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayeTicketPage } from './paye-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: PayeTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayeTicketPageRoutingModule {}
