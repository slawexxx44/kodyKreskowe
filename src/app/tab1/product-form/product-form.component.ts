import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface IProduct {
  format: string;
  barcodeContent: string;
  count: number;
}
@Component({
  templateUrl: 'product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  @Input() barcodeContent: string;
  @Input() format: string;

  product: IProduct = {
    barcodeContent: '',
    format: '',
    count: 1,
  };
  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.product.barcodeContent = this.barcodeContent;
    this.product.format = this.format;
  }

  sendUpdate() {
    console.log(this.product);
    return this.modalCtrl.dismiss('success', 'confirm');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
