import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuPage } from './menu.page';
import { SpinnerModule } from '../../shared/spinner/spinner.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SpinnerModule],
  declarations: [MenuPage],
  exports: [MenuPage],
})
export class MenuPageModule {}
