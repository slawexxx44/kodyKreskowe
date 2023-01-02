import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from './spinner/spinner.module';
import { MenuPageModule } from './menu/menu.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SpinnerModule,
    MenuPageModule,
  ],
  exports: [SpinnerModule, MenuPageModule],
})
export class SharedModule {}
