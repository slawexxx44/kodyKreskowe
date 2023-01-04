import { Injectable } from '@angular/core';

export enum AppRoles {
  external = 0,
  basic = 1,
  extended = 2,
  admin = 3,
}

const PIN = 1415;
@Injectable({ providedIn: 'root' })
export class AccessService {
  public accessRole: string;
  public user: number;

  constructor() {}

  getUserRole(roleId: number): string {
    return AppRoles[roleId];
  }

  verifyAccess(str: number) {
    return str === PIN;
  }

  setUserAccess(accessRole: string, userId: number) {
    this.accessRole = accessRole;
    this.user = userId;
  }
}
