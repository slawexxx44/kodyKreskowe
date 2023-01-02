import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPinFormComponent } from './user-pin.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [UserPinFormComponent],
})
export class UserPinFormModule {}
