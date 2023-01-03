import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPage } from './components/users/users.page';
import { Products2groupsPage } from './components/products2groups/products2groups.page';
import { Products2locationPage } from './components/product2location/product2location.page';
import { AssignLocationPage } from './components/assign-location/assign-location.page';
import { ContextsPage } from './components/assign-contexts/contexts.page';
import {
  CanActivateAdmin,
  CanActivateExtended,
  CanActivateStandard,
} from './shared/guards/page.guards';
import { appRoutes } from './shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: appRoutes.assignUsers,
    pathMatch: 'full',
  },
  {
    path: appRoutes.assignUsers,
    component: UsersPage,
  },
  {
    path: appRoutes.productToGroups,
    component: Products2groupsPage,
    canActivate: [CanActivateStandard],
    title: 'Produkty na grupy',
  },
  {
    path: appRoutes.productsToLocation,
    component: Products2locationPage,
    canActivate: [CanActivateStandard],
    title: 'Produkty na lokalizacje',
  },
  {
    path: appRoutes.assignLocation,
    component: AssignLocationPage,
    canActivate: [CanActivateExtended],
    title: 'Przypisz lokalizacje',
  },
  {
    path: appRoutes.assignContext,
    component: ContextsPage,
    canActivate: [CanActivateAdmin],
    title: 'Przypisz kontekst',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
