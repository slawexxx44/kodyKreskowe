import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IProductGroup {
  ean: string;
  lok_osta_wz: string;
  loka: IProductLocation[];
  masa: string;
  objetosc: string;
  stan: string;
  strefa: string;
  symbol: string;
  szt_osta_wz: string;
}

export interface IProductLocation {
  lokAktu: string;
  lokSugerowana: string;
  masLok: string;
  objeLok: string;
  stanLok: string;
}

export interface ILocationsAssigment {
  lokalizacja: string;
  produkty: string[];
  ilosc?: number;
}

export interface IUsers {
  users: IUserBasic[];
}

export interface IDostawa {
  ik_id: string;
  nr_zam: string;
  koN: string;
  ik_dPortEu: string;
  ik_dMagStart: string;
  ik_dMagStop: string;
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
const t = 5902557244317; //test product

const t2 = [
  '5902557244317',
  '5902557245192',
  '5903271071302',
  '5902557244393',
  '5903271079063',
  '5903271071371',
  '5903707914319',
];

const randomIntFromInterval = (min, max) =>
  // min and max included
  Math.floor(Math.random() * (max - min + 1) + min);

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
    return this.http.get<{ dostawy: IDostawa[] }>(`${apiUrl}tns_dos.php`);
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
    return this.http.get<IProductGroup>(
      `${apiUrl}tns_ean.php?p1=${productCode}`
    );
  }

  getProductLocation(productCode: string) {
    return this.http.get<IProductGroup>(
      `${apiUrl}tns_ean.php?p1=${t2[randomIntFromInterval(0, 6)]}`
    );
  }

  updateProductsLocation(data: ILocationsAssigment[]) {
    return this.http.post(`${apiUrl}/lokalizacja`, data);
  }
}
