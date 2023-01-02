import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccessService, AppRoles } from '../../services/access.service';

const standard = (user: string) =>
  user === AppRoles[1] || user === AppRoles[2] || user === AppRoles[3];
const extended = (user: string) => user === AppRoles[2] || user === AppRoles[3];
const admin = (user: string) => user === AppRoles[3];

const accessMapping = {
  standard,
  extended,
  admin,
};

@Directive({
  selector: '[featureAccess]',
})
export class FeatureAccessDirective {
  private role: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private access: AccessService
  ) {}

  @Input()
  set featureAccess(value: string) {
    this.role = value;
    this.updateView();
  }

  private updateView() {
    if (accessMapping[this.role](this.access.accessRole)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
