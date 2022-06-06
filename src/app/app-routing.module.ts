import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tiket-dialog',
    loadChildren: () => import('./tiket-dialog/tiket-dialog.module').then( m => m.TiketDialogPageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'paye-ticket',
    loadChildren: () => import('./paye-ticket/paye-ticket.module').then( m => m.PayeTicketPageModule)
  },
  {
    path: 'search-voyage',
    loadChildren: () => import('./search-voyage/search-voyage.module').then( m => m.SearchVoyagePageModule)
  },
  {
    path: 'imprimepdf',
    loadChildren: () => import('./imprimepdf/imprimepdf.module').then( m => m.ImprimepdfPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
