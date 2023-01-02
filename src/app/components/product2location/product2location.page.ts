import { Component, OnInit } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeScanResult,
} from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { CommunicationService } from '../../services/communication.service';
import { IProductLocation, HttpService } from '../../services/http.service';
import { FormService } from '../../services/form-service.service';
import { TabService } from '../current-tab.service';

@Component({
  selector: 'app-products-2-locations',
  templateUrl: 'product2location.page.html',
  styleUrls: ['product2location.page.scss'],
})
export class Products2locationPage implements OnInit {
  location: IProductLocation;
  productCode = '';

  constructor(
    private barcodeScanner: BarcodeScanner,
    private communicationService: CommunicationService,
    private httpService: HttpService,
    private formService: FormService,
    public tabService: TabService
  ) {}

  ngOnInit(): void {
    this.tabService.productToLocation$.subscribe(
      (productCode) => {
        this.productCode = productCode;
        this.sendInfo(productCode);
      },
      (e) => console.error(e)
    );
  }

  sendInfo(product: string) {
    if (this.tabService.isLoading$.getValue() || product.length < 1) {
      return;
    }

    console.log('product', product);

    this.tabService.isLoading$.next(true);
    this.httpService.getProductLocation(product).subscribe(
      (data: IProductLocation) => {
        this.location = data;
        this.formService.prependProduct(product);
        this.communicationService.presentToast();
        this.tabService.isLoading$.next(false);
        this.formService.openProductFormModalTest(
          data.lokalizacja,
          null,
          data.stan
        );
      },
      (err) => {
        console.error(err);
        this.tabService.isLoading$.next(false);
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
        this.tabService.productToLocation$.next(barcodeData.text);
      })
      .catch((err) => {
        this.communicationService.presentToast(
          `Błąd pobrania qr code: ${err}`,
          'warning'
        );
      });
  }
}
