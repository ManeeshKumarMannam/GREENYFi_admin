import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';
import { IBreadcrumbs } from '../../common/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  public dashBoardDetails: any = {};
  constructor(public inj: Injector) {
    super(inj);
    this.setBreadcrumbs();
    this.dashBoardData()

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
      { localeKey: 'home', url: null },
      { localeKey: 'Dashboard', url: null },
    ];
    this.subHeaderData = {
      title: 'Dashboard',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/

  dashBoardData() {
    this.commonService.callApi('MasterManagement/dashboard', '', 'get', false, false, false).then((success) => {
      this.dashBoardDetails = success;
      let x = this.dashBoardDetails.totalAmountforRegistredUsers.replace(/,/gi, '');
      let y = this.dashBoardDetails.totalAmountforGuestUsers.replace(/,/gi, '');
      this.dashBoardDetails.totalAmount = Number(x) + Number(y)
    })
  }
}
