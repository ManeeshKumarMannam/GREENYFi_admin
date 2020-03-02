import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../../../common/commonComponent';
import { IBreadcrumbs } from '../../../../common/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent extends BaseComponent implements OnInit {
  public userId: any;
  public userDetail: any = {};
  constructor(public inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe(params => {
      this.userId = params.id;
    })
    this.getUserDetails();
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
      { localeKey: 'Users', url: this.URLConstants.USERS },
      { localeKey: 'User Details', url: null },
    ];
    this.subHeaderData = {
      title: 'User Details',
      breadcrumbs: this.breadcrumbs
    }
  }
  /*************************************************************/

  // api to get user details
  getUserDetails() {
    this.commonService.callApi(this.callAPIConstants.GetUserDetails + this.userId, '', 'get', false, false).then(success => {
      if (success.status == 1) {
        // if (success.data.photo) {
        //   success.data.photo = this.uploadImageUrl + success.data.photo;
        // }
        this.userDetail = success.data;
      }
    })
  }

  status(event) {
    event.preventDefault();
  }
}
