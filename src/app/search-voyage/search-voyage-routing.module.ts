import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchVoyagePage } from './search-voyage.page';

const routes: Routes = [
  {
    path: '',
    component: SearchVoyagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchVoyagePageRoutingModule {}
