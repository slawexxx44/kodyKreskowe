import { Component, OnInit } from '@angular/core';

import { CommunicationService } from '../../services/communication.service';
import { IDostawy, HttpService } from '../../services/http.service';
import { FormService } from '../../services/form-service.service';
import { TabService } from '../current-tab.service';
import { NavController } from '@ionic/angular';
import { appRoutes } from '../../shared/routes/routes';

@Component({
  selector: 'app-contexts-location',
  templateUrl: 'contexts.page.html',
})
export class ContextsPage implements OnInit {
  contexts: { [key: string]: IDostawy[] };

  constructor(
    private communicationService: CommunicationService,
    private http: HttpService,
    private formService: FormService,
    public tabService: TabService,
    private router: NavController
  ) {}

  ngOnInit(): void {
    this.http.getDostawy().subscribe((d) => {
      const obj = {};
      d.dostawy.forEach((dostawa) => {
        if (dostawa.koN.length > 0) {
          const container = `#${dostawa.koN}`;
          obj[container] = obj[container] || [];
          obj[container].push(dostawa);
        } else {
          obj[dostawa.nr_zam] = [];
        }
      });
      console.log('dostepne dostawy', obj);
      this.contexts = obj;
    });
  }

  navigate() {
    this.router.navigateRoot(appRoutes.productToGroups);
  }

  async selectContext(nrZam: string) {
    console.log('kontekts', nrZam);
    const response = await this.formService.openContextForm();
    if (!response) {
      return;
    }
    this.http.setContext(nrZam, response.code).subscribe(
      () => {
        this.communicationService.presentToast('Kontekt ustawiony pomyślnie');
        this.navigate();
      },
      () => {
        this.communicationService.presentToast(
          'Błąd ustawiania kontekstu',
          'danger'
        );
      }
    );
  }
}
