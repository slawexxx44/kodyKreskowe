import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommunicationService } from '../../services/communication.service';
import { IUserBasic, HttpService } from '../../services/http.service';
import { FormService } from '../../services/form-service.service';
import { AccessService, AppRoles } from '../../services/access.service';
import { NavController } from '@ionic/angular';
import { TabService } from '../current-tab.service';
import { appRoutes } from '../../shared/routes/routes';

@Component({
  selector: 'app-users-location',
  templateUrl: 'users.page.html',
})
export class UsersPage implements OnInit {
  users: IUserBasic[];

  constructor(
    private communicationService: CommunicationService,
    private http: HttpService,
    private formService: FormService,
    public tabService: TabService,
    private access: AccessService,
    private router: NavController
  ) {}

  ngOnInit(): void {
    this.http.getUsers().subscribe((d) => {
      this.users = d.users;
    });
  }

  navigate() {
    this.router.navigateRoot(appRoutes.productToGroups);
  }

  async selectUser(user: IUserBasic) {
    const access = this.access.getUserRole(user.su_aktywnyDostawa);

    if (access === AppRoles[0]) {
      this.communicationService.presentToast(
        'Brak dostępu do aplikacji',
        'warning'
      );
      return;
    }

    if (access === AppRoles[3]) {
      const t = await this.formService.openUserPinFormModal();

      if (!t) {
        return;
      }
      if (!this.access.verifyAccess(t.code)) {
        this.communicationService.presentToast('Błędny PIN', 'danger');
        return;
      }
    }

    this.access.setUserAccess(access, user.su_id);

    this.navigate();
  }
}
