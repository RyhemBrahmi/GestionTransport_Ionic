import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiketDialogPageRoutingModule } from './tiket-dialog-routing.module';

import { TiketDialogPage } from './tiket-dialog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiketDialogPageRoutingModule
  ],
  declarations: [TiketDialogPage]
})
export class TiketDialogPageModule {}
