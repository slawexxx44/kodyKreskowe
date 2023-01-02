import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface IProduct {
  format: string;
  barcodeContent: string;
  count: number;
}
@Component({
  templateUrl: 'section-form.component.html',
})
export class SectionFormComponent implements OnInit {
  @Input() barcodeContent: string;
  @Input() format: string;

  section: IProduct = {
    barcodeContent: '',
    format: '',
    count: 1,
  };
  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.section.barcodeContent = this.barcodeContent;
    this.section.format = this.format;
  }

  sendUpdate() {
    return this.modalCtrl.dismiss(
      {
        code: this.section.barcodeContent,
      },
      'confirm'
    );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
