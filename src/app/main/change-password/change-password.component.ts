import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';
import { IBreadcrumbs } from '../../common/interfaces';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: [],
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {
  public passdata: any = {};
  public submitted = false;

  constructor(inj: Injector) {
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
      { localeKey: 'Change Password', url: null },
    ];
    this.subHeaderData = {
      title: 'Change Password',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/

  // api to change password
  changePassword(passwordForm, passdata) {
    this.submitted = true;
    if (passwordForm.valid) {
      const data = {
        oldPassword: passdata.oldPassword,
        newPassword: passdata.newPassword,
      };
      if (passdata.newPassword !== passdata.confirmPassword) {
        this.popToast('error', 'New password & Confirm password not matched');
        passwordForm.reset();
        this.submitted = false;
      } else {
        this.commonService.callApi(this.callAPIConstants.AdminChangePassword, data, 'post', false, false).then((success) => {
          if (success.status === 1) {
            this.popToast('success', success.message);
          } else {
            this.popToast('error', success.message);
          }
        });
      }

    }
  }
}
