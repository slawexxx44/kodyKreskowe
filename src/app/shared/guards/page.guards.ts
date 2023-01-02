import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccessService, AppRoles } from '../../services/access.service';

@Injectable({ providedIn: 'root' })
export class CanActivateStandard implements CanActivate {
  constructor(private access: AccessService) {}

  canActivate(): boolean {
    return (
      this.access.accessRole === AppRoles[1] ||
      this.access.accessRole === AppRoles[2] ||
      this.access.accessRole === AppRoles[3]
    );
  }
}

@Injectable({ providedIn: 'root' })
export class CanActivateExtended implements CanActivate {
  constructor(private access: AccessService) {}

  canActivate(): boolean {
    return (
      this.access.accessRole === AppRoles[2] ||
      this.access.accessRole === AppRoles[3]
    );
  }
}

@Injectable({ providedIn: 'root' })
export class CanActivateAdmin implements CanActivate {
  constructor(private access: AccessService) {}

  canActivate(): boolean {
    return this.access.accessRole === AppRoles[3];
  }
}
