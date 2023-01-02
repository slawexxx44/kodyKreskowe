import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContextsPage } from './contexts.page';

const routes: Routes = [
  {
    path: '',
    component: ContextsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersLocationPageRoutingModule {}
