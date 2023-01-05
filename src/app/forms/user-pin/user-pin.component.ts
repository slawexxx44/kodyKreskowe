import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

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
  constructor(private modalCtrl: ModalController, private platform: Platform) {
    this.platform.keyboardDidShow.subscribe((ev) => {
      const { keyboardHeight } = ev;
      console.log('keyboardShow', ev);
      // Do something with the keyboard height such as translating an input above the keyboard.
    });

    this.platform.keyboardDidHide.subscribe((ev) => {
      console.log('keyboardHide', ev);
      // Move input back to original location
    });
  }

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
