import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContextFormModule } from './context-form/context-form.module';
import { MenuFormModule } from './menu-form/menu-form.module';
import { ProductFormModule } from './product-form/product-form.module';
import { SectionFormModule } from './section-form/section-form.module';
import { UserPinFormModule } from './user-pin/user-pin.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ContextFormModule,
    MenuFormModule,
    ProductFormModule,
    SectionFormModule,
    UserPinFormModule,
  ],
  declarations: [],
  exports: [],
})
export class FormsPageModule {}
