import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiketDialogPage } from './tiket-dialog.page';

const routes: Routes = [
  {
    path: '',
    component: TiketDialogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiketDialogPageRoutingModule {}
