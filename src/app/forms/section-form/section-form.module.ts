import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionFormComponent } from './section-form.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [SectionFormComponent],
})
export class SectionFormModule {}
