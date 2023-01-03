import { NgModule, Injectable } from '@angular/core';
import {
  RouterModule,
  Routes,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { TabsPage } from './tabs.page';
import { AccessService, AppRoles } from '../services/access.service';
import { Products2groupsPage } from './products2groups/products2groups.page';
import { Products2locationPage } from './product2location/product2location.page';
import { AssignLocationPage } from './assign-location/assign-location.page';
import { ContextsPage } from './assign-contexts/contexts.page';

@Injectable({ providedIn: 'root' })
class CanActivateStandard implements CanActivate {
  constructor(private access: AccessService) {}

  canActivate(): boolean {
    return (
      this.access.accessRole === AppRoles[1] ||
      this.access.accessRole === AppRoles[2] ||
      this.access.accessRole === AppRoles[3]
    );
  }
}

@Injectable({ providedIn: 'root' })
class CanActivateExtended implements CanActivate {
  constructor(private access: AccessService) {}

  canActivate(): boolean {
    return (
      this.access.accessRole === AppRoles[2] ||
      this.access.accessRole === AppRoles[3]
    );
  }
}

@Injectable({ providedIn: 'root' })
class CanActivateAdmin implements CanActivate {
  constructor(private access: AccessService) {}

  canActivate(): boolean {
    return this.access.accessRole === AppRoles[3];
  }
}

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'products-2-groups',
        component: Products2groupsPage,
        canActivate: [CanActivateStandard],
      },
      {
        path: 'products-2-location',
        component: Products2locationPage,
        canActivate: [CanActivateStandard],
      },
      {
        path: 'assign-location',
        component: AssignLocationPage,
        canActivate: [CanActivateExtended],
      },
      {
        path: 'context',
        component: ContextsPage,
        canActivate: [CanActivateAdmin],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
