import { Component, HostListener, ChangeDetectorRef } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeScanResult,
} from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { FormService } from '../../services/form-service.service';
import { CommunicationService } from '../../services/communication.service';
import { IProductGroup, HttpService } from '../../services/http.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-products-2-groups',
  templateUrl: 'products2groups.page.html',
  styleUrls: ['products2groups.page.scss'],
})
export class Products2groupsPage {
  group: IProductGroup;
  productCode = '';

  constructor(
    private barcodeScanner: BarcodeScanner,
    public formService: FormService,
    private communicationService: CommunicationService,
    private httpService: HttpService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('document:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log('event', event.code);

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
      console.log('return');
      return;
    }

    console.log('before sending request');
    this.httpService.getProductLocation(this.productCode).subscribe(
      (data: IProductGroup) => {
        console.log('request sent successfully');
        this.group = data;
        this.communicationService.presentToast();

        this.cdr.detectChanges();
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
