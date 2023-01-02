import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products2locationPage } from './product2location.page';

const routes: Routes = [
  {
    path: '',
    component: Products2locationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Product2LocationPageRoutingModule {}
