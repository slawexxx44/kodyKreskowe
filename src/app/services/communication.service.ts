import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    message = 'Informacja pomyślnie wysłana',
    color = 'success'
  ) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }
}
