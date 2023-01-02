import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products2groupsPage } from './products2groups.page';

const routes: Routes = [
  {
    path: '',
    component: Products2groupsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Products2GroupsPageRoutingModule {}
