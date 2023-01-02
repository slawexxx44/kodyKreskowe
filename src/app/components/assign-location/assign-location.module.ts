import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignLocationPage } from './assign-location.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SharedModule],
  declarations: [AssignLocationPage],
  exports: [AssignLocationPage],
})
export class AssignLocationPageModule {}
