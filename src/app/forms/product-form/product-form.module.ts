import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [ProductFormComponent],
})
export class ProductFormModule {}
