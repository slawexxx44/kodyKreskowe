import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContextFormComponent } from './context-form.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [ContextFormComponent],
})
export class ContextFormModule {}
