import { Component, Input } from '@angular/core';

import { NavController } from '@ionic/angular';

import { appRoutes } from '../routes/routes';
@Component({
  selector: 'app-menu-page',
  templateUrl: 'menu.page.html',
})
export class MenuPage {
  @Input() header: string;

  appRoutes = appRoutes;
  menuId = 'application-menu';
  constructor(private router: NavController) {}

  navigate(path: string) {
    return this.router.navigateRoot(path);
  }

  logOut(path: string) {
    this.router.navigateRoot(path);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
