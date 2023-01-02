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
      console.log(d);
      const obj = {
        brak: [],
      };
      d.dostawy.forEach((dostawa) => {
        if (dostawa.koN.length > 0) {
          obj[dostawa.koN] = obj[dostawa.koN] || [];
          obj[dostawa.koN].push(dostawa);
        } else {
          obj.brak.push(dostawa);
        }
      });

      console.log(obj);
      this.contexts = obj;
    });
  }

  navigate() {
    this.router.navigateRoot(appRoutes.productToGroups);
  }

  async selectContext(c: IDostawy) {
    console.log('kontekts', c.nr_zam);
    const response = await this.formService.openContextForm();
    if (!response) {
      return;
    }
    this.http.setContext(c.nr_zam, response.code).subscribe(
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
