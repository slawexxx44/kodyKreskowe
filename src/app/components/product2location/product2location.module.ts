import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Products2locationPage } from './product2location.page';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SharedModule],
  declarations: [Products2locationPage],
  exports: [Products2locationPage],
})
export class Product2LocationPageModule {}
