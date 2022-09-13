import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  msg = 'tekst... ';

  constructor() {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log('event: ', event);
    console.log('event.key:', event.key);
    this.msg += event.key;
  }
}
