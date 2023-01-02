import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface IProduct {
  format: string;
  barcodeContent: string;
  count: number;
}
@Component({
  templateUrl: 'context-form.component.html',
  styles: [],
})
export class ContextFormComponent {
  reset = true;
  constructor(private modalCtrl: ModalController) {}

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
}
