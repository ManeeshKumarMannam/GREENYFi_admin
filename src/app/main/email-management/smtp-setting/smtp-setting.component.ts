import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { IBreadcrumbs } from '../../../common/interfaces';

@Component({
  selector: 'app-smtp-setting',
  templateUrl: './smtp-setting.component.html',
  styles: [],
})
export class SmtpSettingComponent extends BaseComponent implements OnInit {
  public submitted = false;
  constructor(public inj: Injector) {
    super(inj);
    this.getSMTPDetails();
    this.setBreadcrumbs();
  }

  ngOnInit() {

  }

  /*********************************************************************************
           @PURPOSE      : Set the Sub Header
           @PARAMETERS   : {
                            localKey: string //Heading Name
                             URL: any       
                            }
/*********************************************************************************/
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  setBreadcrumbs() {
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Email Management', url: this.URLConstants.ADMIN_EMAIL },
      { localeKey: 'SMTP Settings', url: null },
    ];
    this.subHeaderData = {
      title: 'SMTP Settings',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/


  /*********************************************************************************
          @PURPOSE      :   api to get smtp details
          @PARAMETERS   : ""
/*********************************************************************************/

  getSMTPDetails() {
    this.commonService.callApi(this.callAPIConstants.GetSMTPsettings, '', 'get', false, false).then((success) => {
      if (success.status === 1) {
        this.smtp = success.data.smtp;
      }
    });
  }


  /*********************************************************************************
          @PURPOSE      : api to update smtp details
          @PARAMETERS   : {
                           smtp: object //Heading Name
                           }
/*********************************************************************************/

  public smtp = { port: '', host: '', username: '', password: '' };
  SubmitSMTP(smtpForm, smtp) {
    this.submitted = true;
    if (smtpForm.valid) {
      this.commonService.callApi(this.callAPIConstants.AddSMTPsettings, smtp, 'post', false, false).then((success) => {
        if (success.status === 1) {
          this.popToast('success', 'Data Stored Successfully');
        }
      });
    }
  }
}
