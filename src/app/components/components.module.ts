import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssignLocationPageModule } from './assign-location/assign-location.module';
import { ContextsPageModule } from './contexts/contexts.module';
import { Product2LocationPageModule } from './product2location/product2location.module';
import { ProductsToGroupPageModule } from './products2groups/products2groups.module';
import { UsersPageModule } from './users/users.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AssignLocationPageModule,
    ContextsPageModule,
    Product2LocationPageModule,
    ProductsToGroupPageModule,
    UsersPageModule,
  ],
  declarations: [],
  exports: [],
})
export class ComponentsPageModule {}
