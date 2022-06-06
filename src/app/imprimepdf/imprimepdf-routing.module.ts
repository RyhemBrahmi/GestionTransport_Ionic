import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImprimepdfPage } from './imprimepdf.page';

const routes: Routes = [
  {
    path: '',
    component: ImprimepdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprimepdfPageRoutingModule {}
