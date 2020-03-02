import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { IBreadcrumbs } from '../../../common/interfaces';

@Component({
  selector: 'app-admin-emails',
  templateUrl: './admin-emails.component.html',
  styles: [],
})
export class AdminEmailsComponent extends BaseComponent implements OnInit {
  public editDefaultEmail = false;
  public submitted = false;
  public EmailTitleList: any;
  public email = [];
  public defaultEmail = { defaultFromEmail: '', defaultAdminEmail: '' };
  public permission: any;

  constructor(public inj: Injector) {
    super(inj);
    this.setBreadcrumbs();
    // START: Role Permission //
    this.permission = this.getRolePermissions('adminEmail');
    // END: Role Permission //
    this.getEmailTitleList();
    this.getEmailDetails();
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
      { localeKey: 'Email Management', url: null },
      { localeKey: 'Admin E-mails', url: null },
    ];
    this.subHeaderData = {
      title: 'Admin E-mails',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /****************************************************************************************
            @PURPOSE      :api to get email details
            @PARAMETERS   : ""
   /****************************************************************************************/
  getEmailDetails() {
    this.commonService.callApi(this.callAPIConstants.AdminEmailGetEmailSettings, '', 'get', false, false).then((success) => {
      if (success.status === 1) {
        success.data.emailSettings.forEach((element) => {
          element.emailTitle = element.emailTemplateId.emailTitle;
        });
        this.email = success.data.emailSettings;
        this.defaultEmail = {
          defaultAdminEmail: success.data.defaultAdminEmail,
          defaultFromEmail: success.data.defaultFromEmail,
        };
      }
    });
  }
  /****************************************************************************************/


  /*********************************************************************************
            @PURPOSE      : api to get list for email title on dropdown
            @PARAMETERS   : ""
  /*********************************************************************************/
  getEmailTitleList() {
    this.commonService.callApi(this.callAPIConstants.AdminEmailGetEmailTitle, '', 'get', false, false).then((success) => {
      if (success.status === 1) {
        this.EmailTitleList = success.data;
      }
    });
  }

  /*********************************************************************************
            @PURPOSE      : DEFAULT From Email and Admin Email
            @PARAMETERS   : ""
  /*********************************************************************************/
  showEditDefaultEmail() {
    this.editDefaultEmail = !this.editDefaultEmail;
    this.getEmailDetails();
  }
  /*********************************************************************************
              @PURPOSE      :save Default Email
              @PARAMETERS   : defaultEmail :object
 /*********************************************************************************/
  saveDefaultEmail(defaultEmailForm, defaultEmail) {
    if (defaultEmailForm.valid) {
      this.editDefaultEmail = false;
      this.commonService.callApi(this.callAPIConstants.AdminEmailaddDefaultEmailSettings, this.defaultEmail, 'post', false, false)
        .then((success) => {
        });
      this.getEmailDetails();
    }
  }
  /***************************************************************/


  /*********************************************************************************
               @PURPOSE      :From Email and Admin Email
               @PARAMETERS   : defaultEmail :object
/*********************************************************************************/

  edit(i) {
    i.editable = true;
    this.addNew = false;
  }

  cancelEdit(i) {
    i.editable = false;
    this.submitted = false;
    this.getEmailDetails();
  }

  saveEdit(emailForm, i) {
    this.submitted = true;
    if (emailForm.valid) {
      i.emailTemplateId = i.emailTemplateId._id;
      let data;
      i._id ?
        data = { _id: i._id, emailTemplateId: i.emailTemplateId, fromEmail: i.fromEmail, adminEmail: i.adminEmail } :
        data = { emailTemplateId: i.emailTemplateId, fromEmail: i.fromEmail, adminEmail: i.adminEmail };
      this.commonService.callApi(this.callAPIConstants.AdminEmailAddEmailSettings, data, 'post', false, false).then((success) => {
        if (success.status === 1) {
          this.popToast('success', 'Data Stored Successfully');
          this.submitted = false;
        } else {
          this.popToast('error', success.message);
        }
      });
      i.editable = false;
      setTimeout(() => {
        this.getEmailDetails();
      }, 100);
    }
  }

  delete(i) {
    this.confirmpopToast('warning', 'Do you want to delete??').then((result) => {
      if (result.value === true) {
        const data = {
          settingsId: i._id,
        };
        this.commonService.callApi(this.callAPIConstants.AdminEmailDeleteEmailSettings + i._id, data, 'delete', false, false)
          .then((success) => {
            if (success.status === 1) {
              this.popToast('success', success.message);
              this.getEmailDetails();
            } else {
              this.popToast('error', success.message);
            }
          });
      }
    });
  }

  canceladdNewEmail(index) {
    this.email.splice(index, 1);
    this.submitted = false;
  }

  public addNew = false;
  addNewEmail() {
    this.addNew = true;
    this.email.push({ emailTemplateId: '', fromEmail: '', adminEmail: '', editable: true });
  }
  /***************************************************************/
}
