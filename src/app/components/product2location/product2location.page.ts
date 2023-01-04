import { Component, HostListener } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeScanResult,
} from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { CommunicationService } from '../../services/communication.service';
import {
  IProductLocation,
  HttpService,
  IProductGroup,
} from '../../services/http.service';
import { FormService } from '../../services/form-service.service';

@Component({
  selector: 'app-products-2-locations',
  templateUrl: 'product2location.page.html',
  styleUrls: ['product2location.page.scss'],
})
export class Products2locationPage {
  location: IProductLocation[];
  productCode = '';

  constructor(
    private barcodeScanner: BarcodeScanner,
    private communicationService: CommunicationService,
    private httpService: HttpService,
    private formService: FormService
  ) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log('event', event.code);

    if (event.key === 'Escape') {
      return;
    }

    if (event.key === 'Shift') {
      return (this.productCode = '');
    }

    if (event.key === 'Enter') {
      console.log('Enter');
      this.sendInfo();

      return (this.productCode = '');
    }

    this.productCode += event.key;
  }

  sendInfo() {
    if (this.productCode.length < 1) {
      return;
    }

    console.log('product', this.productCode);

    this.httpService.getProductLocation(this.productCode as any).subscribe(
      (data: IProductGroup) => {
        this.location = data?.loka;
        this.formService.prependProduct(this.productCode);
        this.communicationService.presentToast();
      },
      (err) => {
        console.error(err);

        this.communicationService.presentToast(
          `Błąd wysyłania wiadomości: ${err}`,
          'danger'
        );
      }
    );
  }

  scan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData: BarcodeScanResult) => {
        this.productCode = barcodeData.text;
        this.sendInfo();
      })
      .catch((err) => {
        this.communicationService.presentToast(
          `Błąd pobrania qr code: ${err}`,
          'warning'
        );
      });
  }
}
