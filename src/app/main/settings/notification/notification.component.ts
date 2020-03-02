import { Component, Injector, OnInit } from '@angular/core';

// common
import { BaseComponent } from '../../../common/commonComponent';
import { IBreadcrumbs } from '../../../common/interfaces';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styles: [],
})
export class NotificationComponent extends BaseComponent implements OnInit {

  constructor(public inj: Injector) {
    super(inj);
    this.setBreadcrumbs();
  }

  ngOnInit() {
  }
  /*************************************************************/
  // Sub Header
  /*************************************************************/
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  setBreadcrumbs() {
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Settings', url: null },
      { localeKey: 'Notifications', url: null },
    ];
    this.subHeaderData = {
      title: 'Notifications',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/
}
