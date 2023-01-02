import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  productToGroups$ = new Subject<string>();
  productToLocation$ = new Subject<string>();
  locations$ = new Subject<string>();
  isLoading$ = new BehaviorSubject<boolean>(false);

  private privateTab = '';

  constructor() {}

  public get tab() {
    return this.privateTab;
  }
  public set tab(tab: string) {
    this.privateTab = tab;
  }
}
