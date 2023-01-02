import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuPage } from './menu.page';
import { FeatureAccessDirective } from '../../shared/guards/feature-access.directive';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [MenuPage, FeatureAccessDirective],
  exports: [MenuPage, FeatureAccessDirective],
})
export class MenuPageModule {}
