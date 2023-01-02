import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface IProduct {
  format: string;
  barcodeContent: string;
  count: number;
}
@Component({
  templateUrl: 'user-pin.component.html',
  styles: [],
})
export class UserPinFormComponent {
  pin: number;
  constructor(private modalCtrl: ModalController) {}

  sendUpdate() {
    return this.modalCtrl.dismiss(
      {
        code: this.pin,
      },
      'confirm'
    );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
