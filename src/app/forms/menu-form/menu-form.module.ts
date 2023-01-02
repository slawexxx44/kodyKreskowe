import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuFormComponent } from './menu-form.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [MenuFormComponent],
})
export class MenuFormModule {}
