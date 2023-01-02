import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface IProduct {
  format: string;
  barcodeContent: string;
  count: number;
}
@Component({
  templateUrl: 'product-form.component.html',
  styles: [
    `
      ion-text {
        text-align: center;
      }
    `,
  ],
})
export class ProductFormComponent {
  @Input() strefa: string;
  @Input() podstrefa: string;
  @Input() ilosc: string;

  constructor(private modalCtrl: ModalController) {
    setTimeout(() => {
      this.cancel();
    }, 10000);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
