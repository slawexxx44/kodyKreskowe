import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AccessService } from '../../services/access.service';

export interface IProduct {
  format: string;
  barcodeContent: string;
  count: number;
}
@Component({
  templateUrl: 'menu-form.component.html',
  styles: [],
})
export class MenuFormComponent {
  reset = true;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    public access: AccessService
  ) {}

  sendUpdate() {
    return this.modalCtrl.dismiss(
      {
        code: this.reset ? 1 : 0,
      },
      'confirm'
    );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  navigateToContext() {
    this.modalCtrl.dismiss(null, 'cancel');
    this.router.navigate(['/context']);
  }

  navigateToUsers() {
    this.modalCtrl.dismiss(null, 'cancel');
    this.router.navigate(['/users']);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
