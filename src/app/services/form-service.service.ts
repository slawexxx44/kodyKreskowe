import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductFormComponent } from '../forms/product-form/product-form.component';
import { BarcodeScanResult } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { SectionFormComponent } from '../forms/section-form/section-form.component';
import { UserPinFormComponent } from '../forms/user-pin/user-pin.component';
import { ContextFormComponent } from '../forms/context-form/context-form.component';
import { MenuFormComponent } from '../forms/menu-form/menu-form.component';

@Injectable({ providedIn: 'root' })
export class FormService {
  productCode: string;
  productCount: number;
  sectionCode: string;
  products: string[] = [];

  constructor(private modalCtrl: ModalController) {}

  prependProduct(productCode: string) {
    this.products.push(productCode);
  }

  getProducts() {
    return this.products;
  }

  clearProducts() {
    this.products = [];
  }

  reassignProducts(products: string[]) {
    this.products = products;
  }

  prepareData(code: BarcodeScanResult) {
    if (code?.text?.length > 3) {
      this.openProductFormModal(code);
    }

    if (code?.text?.length < 4) {
      this.openSectionFormModal(code);
    }
  }

  resetData() {
    this.productCode = null;
    this.productCount = null;
    this.sectionCode = null;
  }

  public async openProductFormModalTest(strefa, podstrefa, ilosc) {
    const productModal = await this.modalCtrl.create({
      component: ProductFormComponent,
      componentProps: {
        strefa,
        podstrefa,
        ilosc,
      },
      backdropDismiss: true,
      cssClass: 'full-scren',
    });

    productModal.present();

    const { data, role } = await productModal.onWillDismiss();

    if (role === 'confirm') {
      this.productCode = data.code;
      this.productCount = data.count;
    }
  }

  public async openMenuFormModal() {
    const productModal = await this.modalCtrl.create({
      component: MenuFormComponent,
      componentProps: {},
      backdropDismiss: true,
      cssClass: 'full-scren',
    });

    productModal.present();

    const { data, role } = await productModal.onWillDismiss();

    if (role === 'confirm') {
      this.productCode = data.code;
      this.productCount = data.count;
    }
  }

  public async openUserPinFormModal() {
    const productModal = await this.modalCtrl.create({
      component: UserPinFormComponent,
      componentProps: {},
    });

    productModal.present();

    const { data, role } = await productModal.onWillDismiss();

    if (role === 'confirm') {
      return data;
    }
  }

  public async openContextForm() {
    const productModal = await this.modalCtrl.create({
      component: ContextFormComponent,
      componentProps: {},
    });

    productModal.present();

    const { data, role } = await productModal.onWillDismiss();

    if (role === 'confirm') {
      return data;
    } else {
      return null;
    }
  }

  private async openProductFormModal(code: BarcodeScanResult) {
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
      this.productCode = data.code;
      this.productCount = data.count;
    }
  }

  private async openSectionFormModal(code: BarcodeScanResult) {
    const productModal = await this.modalCtrl.create({
      component: SectionFormComponent,
      componentProps: {
        format: code.format,
        barcodeContent: code.text,
      },
    });

    productModal.present();

    const { data, role } = await productModal.onWillDismiss();

    if (role === 'confirm') {
      this.sectionCode = data.code;
    }
  }
}
