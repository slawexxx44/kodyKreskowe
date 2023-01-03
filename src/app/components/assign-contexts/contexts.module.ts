import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContextsPage } from './contexts.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SharedModule],
  declarations: [ContextsPage],
  exports: [ContextsPage],
})
export class ContextsPageModule {}
