import { Component, OnDestroy, OnInit } from '@angular/core';
import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';
import { FormService } from './services/form-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private insomnia: Insomnia, private form: FormService) {}

  ngOnInit(): void {
    this.insomnia.keepAwake().then(
      () => console.log('success keeping awake mobile'),
      () => console.log('error keeping awake mobile')
    );
  }

  ngOnDestroy(): void {
    this.insomnia.allowSleepAgain().then(
      () => console.log('success'),
      () => console.log('error')
    );
  }

  openMenu() {
    this.form.openMenuFormModal();
  }
}
