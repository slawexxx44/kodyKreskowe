import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersPage } from './users.page';
import { SpinnerModule } from '../../shared/spinner/spinner.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SpinnerModule],
  declarations: [UsersPage],
  exports: [UsersPage],
})
export class UsersPageModule {}
