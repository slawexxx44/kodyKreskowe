import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Products2groupsPage } from './products2groups.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SharedModule],
  declarations: [Products2groupsPage],
  exports: [Products2groupsPage],
})
export class ProductsToGroupPageModule {}
