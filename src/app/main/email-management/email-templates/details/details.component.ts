import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../common/commonComponent';
import { IBreadcrumbs } from '../../../../common/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [],
})
export class DetailsComponent extends BaseComponent implements OnInit, OnDestroy {
  public emailTemplateId: any;
  public type: any = 'emailDetail';
  public imageUrl: any;
  public emailTemplateData: any;
  public gjs = 'gjs'
  constructor(public inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.emailTemplateId = params.id;
    });
    if (this.emailTemplateId) {
      this.getEmailTemplateDetail();
    } else {
      this.emailTemplateData = { emailKey: '', subject: '', gjsHtml: '', gjsCss: '' };
    }
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
    const title = this.emailTemplateId ? 'Edit E-mail Templates' : 'Add E-mail Templates';
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Email Management', url: this.URLConstants.ADMIN_EMAIL },
      { localeKey: 'E-mail Templates', url: this.URLConstants.EMAIL_TEMPLATE_list },
      { localeKey: title, url: null },
    ];
    this.subHeaderData = {
      title,
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/

  /*********************************************************************************
          @PURPOSE      :Remove the Tokens
          @PARAMETERS   : {
                           localKey: string //Heading Name
                            URL: any       
                           }
/*********************************************************************************/
  ngOnDestroy() {
    this.removeToken('gjshtml');
    this.removeToken('gjscss');
    this.removeToken('gjscomponents');
    this.removeToken('gjsstyles');
    this.removeToken('gjsassets');
    this.removeToken('gjs-inlined-html');
  }


  /*********************************************************************************
         @PURPOSE      : api to get email template details
         @PARAMETERS   : {
                          localKey: string //Heading Name
                           URL: any       
                          }
 /*********************************************************************************/

  getEmailTemplateDetail() {
    this.commonService.callApi(this.callAPIConstants.EmailTemplateDetail + this.emailTemplateId, '', 'get', false, false)
      .then((success) => {
        this.emailTemplate = success.data;
        this.setToken('gjshtml', success.data.gjsHtml);
        this.setToken('gjscss', success.data.gjsCss);
        this.emailTemplateData = { gjsHtml: success.data.gjsHtml, gjsCss: success.data.gjsCss };
      });
  }


  /*********************************************************************************
        @PURPOSE      :api to save new template or update template
        @PARAMETERS   : {
                         localKey: string //Heading Name
                          URL: any       
                         }
/*********************************************************************************/


  public emailTemplate: any = {};
  public submitted = false;
  submitEmailTemplate(emailTemplateForm, emailTemplate) {
    this.submitted = true;
    const html = this.getToken('gjshtml');
    if (emailTemplateForm.valid && html) {
      emailTemplate.gjsCss = this.getToken('gjscss');
      emailTemplate.gjsHtml = html;
      emailTemplate.gjsComponents = this.getToken('gjscomponents');
      emailTemplate.gjsStyles = this.getToken('gjsstyles');
      emailTemplate.gjsAssets = this.getToken('gjsassets');
      // emailTemplate.emailContent = '<style>' + this.getToken('gjscss') + '</style>' + html;
      emailTemplate.emailContent = this.getToken('gjs-inlined-html');
      if (this.emailTemplateId) {
        emailTemplate.id = this.emailTemplateId;
      }
      this.commonService.callApi(this.callAPIConstants.EmailAddNewEmail, emailTemplate, 'post', false, false).then((success) => {
        if (success.status === 1) {
          this.removeToken('gjshtml');
          this.removeToken('gjscss');
          this.removeToken('gjscomponents');
          this.removeToken('gjsstyles');
          this.removeToken('gjsassets');
          this.removeToken('gjs-inlined-html');
          this.router.navigate([this.URLConstants.EMAIL_TEMPLATE_list]);
          this.popToast('success', success.message)
        }
        else {
          this.popToast('error', success.message);
        }
      });
    }
    if (!html) {
      this.popToast('error', 'Provide Email Template');
    }
  }
}
