import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IProductGroup {
  strefa: string;
  podstrefa: string;
  ilosc: number;
}

export interface IProductLocation {
  lokalizacja: string;
  ilosc: string;
  stan: number;
}

export interface ILocationsAssigment {
  lokalizacja: string;
  produkty: string[];
  ilosc?: number;
}

export interface IUsers {
  users: IUserBasic[];
}

export interface IUserBasic {
  su_id: number;
  su_inic: string;
  su_imie: string;
  su_nazwisko: string;
  su_aktywnyDostawa: number;
}

export interface IDostawy {
  ik_dMagStart: string;
  ik_id: number;
  koN: string;
  nr_zam: string;
}

export interface IUser {
  dostawy: IDostawy[];
  ini: string;
  su_aktywny: number;
  su_aktywny_dostawa: number;
  su_id: number;
  su_imie: string;
  su_nazwisko: string;
  su_pass_hash: string;
}

const apiUrl = 'http://10.0.0.203/app/';
const t = 5902557245192; //test product
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<IUsers>(`${apiUrl}tns_usr.php`);
  }

  getUser(ini = 'lk') {
    return this.http.get<IUser>(`${apiUrl}tns_aut.php?ini=${ini}`);
  }

  getDostawy() {
    return this.http.get<any>(`${apiUrl}tns_dos.php`);
  }

  getUserToken2(ini = 'lk') {
    return this.http.get<any>(`${apiUrl}tns_aut.php?ini=${ini}`);
  }

  setContext(dostawa: string, usunCzas: number) {
    return this.http.get<any>(
      `${apiUrl}tns_dos_start.php?p1=${dostawa}&p2=${usunCzas}`
    );
  }

  getProductGroup(productCode: string) {
    console.log(`${apiUrl}tns.php?p1=${productCode}`);
    return this.http.get<IProductGroup>(`${apiUrl}tns.php?p1=${productCode}`);
  }

  getProductLocation(productCode: string) {
    return this.http.get<IProductLocation>(
      `${apiUrl}tns.php?p1=${productCode}`
    );
  }

  updateProductsLocation(data: ILocationsAssigment[]) {
    return this.http.post(`${apiUrl}/lokalizacja`, data);
  }
}
