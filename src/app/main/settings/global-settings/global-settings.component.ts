import { Component, Injector, OnInit } from '@angular/core';

// common
import { BaseComponent } from '../../../common/commonComponent';
import { IBreadcrumbs } from '../../../common/interfaces';

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styles: [],
})
export class GlobalSettingsComponent extends BaseComponent implements OnInit {
  public global = { currency: '', dateFormat: '', metaTitle: '', metaDescription: '', metaKeyword: '' };
  public submitted = false;
  public emailSettings: any = {}
  constructor(public inj: Injector) {
    super(inj);

    this.getEmailSettings();
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
      { localeKey: 'Email Settings', url: null },
    ];
    this.subHeaderData = {
      title: 'Email Settings',
      breadcrumbs: this.breadcrumbs,
    };
  }




  // api to get Email settings
  getEmailSettings() {
    this.commonService.callApi(this.callAPIConstants.getEmailSettings, '', 'get', false, false).then((success) => {
      if (success.status === 1) {
        this.emailSettings = success.data;
      }
    });
  }

  // api to update global settings
  submitGlobalForm(form, global) {
    this.submitted = true;
    if (form.valid) {
      this.commonService.callApi(this.callAPIConstants.GlobalSettingsUpdate, global, 'post', false, false).then((success) => {
        success.status === 1 ? this.popToast('success', 'Updated Successfully!') : this.popToast('error', 'Something Went Wrong!');
      });
    }
  }
  submitEmailSettings(form, emailSettings) {
    let data = {
      transactionNotification: emailSettings.transactionNotification,
      enquiryNotification: emailSettings.enquiryNotification
    }

    this.commonService.callApi(this.callAPIConstants.updateEmailSettings, data, 'post', false, false).then((success) => {
      success.status === 1 ? this.popToast('success', 'Updated Successfully!') : this.popToast('error', 'Something Went Wrong!');
    });
  }

}
