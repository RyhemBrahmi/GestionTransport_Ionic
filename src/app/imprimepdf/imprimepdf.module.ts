import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImprimepdfPageRoutingModule } from './imprimepdf-routing.module';

import { ImprimepdfPage } from './imprimepdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImprimepdfPageRoutingModule
  ],
  declarations: [ImprimepdfPage]
})
export class ImprimepdfPageModule {}
