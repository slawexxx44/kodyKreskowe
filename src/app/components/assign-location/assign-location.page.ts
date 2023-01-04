import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import {
  BarcodeScanner,
  BarcodeScanResult,
} from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { CommunicationService } from '../../services/communication.service';
import { ILocationsAssigment, HttpService } from '../../services/http.service';
import { FormService } from '../../services/form-service.service';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-assign-location',
  templateUrl: 'assign-location.page.html',
})
export class AssignLocationPage implements OnInit {
  locations: ILocationsAssigment[] = [];
  productCodes: string[] = [];
  locationCode = '';

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
      return (this.locationCode = '');
    }

    if (event.key === 'Enter') {
      console.log('Enter');
      this.prependLocation(this.locationCode);

      return (this.locationCode = '');
    }

    this.locationCode += event.key;
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively

    this.checkCurrentLocalizationAssigment(ev.detail.from, ev.detail.to);

    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  checkCurrentLocalizationAssigment(from: number, to: number) {
    // 321loc123 is an devider to search later for number of occurancies
    const locDevider = '321loc123';
    const productCodes = [].concat(
      ...this.locations.map((loc) => [locDevider, ...loc.produkty])
    );

    console.log('productCodes', productCodes);
    const productCode = productCodes[from];
    console.log('productCode', productCode);

    //origin location
    const originLocalizationCode = this.locations.find((loc) =>
      loc.produkty.includes(productCode)
    );

    const copyoriginLocalizationCode = { ...originLocalizationCode };
    const originProductIndex =
      originLocalizationCode.produkty.indexOf(productCode);

    //remove product from location
    copyoriginLocalizationCode.produkty.splice(originProductIndex, 1);

    //----- Destination ----//

    const targetProductsCodes = productCodes.slice(0, to + 1);
    console.log('targetProductsCodes', targetProductsCodes);
    const localizationTargetIndex =
      targetProductsCodes.filter((codes) => codes === locDevider).length - 1;

    const targetLocalization = this.locations[localizationTargetIndex];
    console.log('targetLocalization', targetLocalization);

    const copytargetLocalization = { ...targetLocalization };

    const itemsFromOtherLocalizations =
      targetProductsCodes.lastIndexOf(locDevider) + 1;

    console.log('itemsFromOtherLocalizations', itemsFromOtherLocalizations);

    //add product to target location
    const newProductIndex = to - itemsFromOtherLocalizations;
    copytargetLocalization.produkty.splice(newProductIndex, 0, productCode);

    if (originLocalizationCode.lokalizacja === targetLocalization.lokalizacja) {
      console.log('the same location');
      const oldIndex = targetLocalization.produkty.indexOf(productCode);

      targetLocalization.produkty.splice(
        newProductIndex,
        0,
        targetLocalization.produkty.splice(oldIndex, 1)[0]
      );
    } else {
      console.log('different location');
      //assign arrays
      originLocalizationCode.produkty = copyoriginLocalizationCode.produkty;
      targetLocalization.produkty = copytargetLocalization.produkty;
    }

    console.log(this.locations);
  }

  prependLocation(locationCode: string) {
    this.locations.push({
      lokalizacja: locationCode,
      produkty: this.locations.length > 0 ? [] : this.productCodes,
    });
  }

  ngOnInit(): void {
    this.productCodes = this.formService.getProducts();

    console.log('productCodes', this.productCodes);
  }

  sendInfo() {
    if (this.locations.length < 1) {
      return;
    }

    this.httpService.updateProductsLocation(this.locations).subscribe(
      () => {
        this.formService.clearProducts();
        this.communicationService.presentToast();
        this.locations = [];
        this.productCodes = [];
        this.locationCode = '';
      },
      (err) => {
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
        this.prependLocation(barcodeData.text);
      })
      .catch((err) => {
        this.communicationService.presentToast(
          `Błąd pobrania qr code: ${err}`,
          'warning'
        );
      });
  }

  removeItem(product: string, index: number) {
    this.locations[index].produkty = this.locations[index].produkty.filter(
      (val) => val !== product
    );
    console.log(this.locations);
    this.productCodes = this.productCodes.filter((val) => val !== product);
    this.formService.reassignProducts(this.productCodes);
  }

  removeLocation(i: number) {
    this.locations.splice(i, 1);
  }
}
