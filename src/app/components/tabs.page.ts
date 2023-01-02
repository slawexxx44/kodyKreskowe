import { Component, HostListener } from '@angular/core';
import { TabService } from './current-tab.service';
import { AccessService } from '../services/access.service';
import { FormService } from '../services/form-service.service';

enum TabsNames {
  'products-2-groups' = 1,
  'products-2-location' = 2,
  'assign-location' = 3,
}

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  productCode = '';

  constructor(
    public tabService: TabService,
    private form: FormService,
    public access: AccessService
  ) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log('event', event.code);

    if (this.tabService.isLoading$.getValue() || event.key === 'Escape') {
      return;
    }

    if (event.key === 'Shift') {
      return (this.productCode = '');
    }

    if (event.key === 'Enter') {
      if (this.tabService.tab === TabsNames[1]) {
        console.log(
          'Enter',
          TabsNames[1],
          this.tabService.tab,
          this.tabService.isLoading$.getValue()
        );
        this.tabService.productToGroups$.next(this.productCode);
      }
      if (this.tabService.tab === TabsNames[2]) {
        console.log(
          'Enter',
          TabsNames[2],
          this.tabService.tab,
          this.tabService.isLoading$.getValue()
        );

        this.tabService.productToLocation$.next(this.productCode);
      }
      if (this.tabService.tab === TabsNames[3]) {
        console.log(
          'Enter',
          TabsNames[3],
          this.tabService.tab,
          this.tabService.isLoading$.getValue()
        );

        this.tabService.locations$.next(this.productCode);
      }
      return (this.productCode = '');
    }

    this.productCode += event.key;
  }

  setCurrentTab(e: { tab: string }) {
    this.tabService.tab = e.tab;
  }

  openMenu() {
    this.form.openMenuFormModal();
  }
}
