import { Component } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeScanResult,
} from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { ProductFormComponent } from '../product-form/product-form.component';

const testResponse: BarcodeScanResult = {
  cancelled: false,
  text: 'D48',
  format: 'CODE_39',
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    private barcodeScanner: BarcodeScanner,
    public modalCtrl: ModalController
  ) {}

  scan() {
    return this.barcodeScanner
      .scan()
      .then((barcodeData: BarcodeScanResult) =>
        this.openProductFormModal(barcodeData)
      )
      .catch((err) => {
        console.log('Error', err);
      });
  }

  scanBarcode() {
    const test = () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(testResponse), 1000);
      });

    return test().then(() => this.openProductFormModal(testResponse));
  }

  async openProductFormModal(code: BarcodeScanResult) {
    const productModal = await this.modalCtrl.create({
      component: ProductFormComponent,
      componentProps: {
        format: code.format,
        barcodeContent: code.text,
      },
    });
    productModal.present();

    const { data, role } = await productModal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
    }
  }
}
