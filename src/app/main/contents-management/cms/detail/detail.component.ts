import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../common/commonComponent';
import { IBreadcrumbs } from '../../../../common/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent extends BaseComponent implements OnInit, OnDestroy {
  public grapesJsData: any;
  public type = 'cmsDetail';
  public cmsID: any;
  public submitted = false;
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  public title: any;
  public gjs = 'gjs';

  public cms = { metaTitle: '', metaDescription: '', metaKeyword: '', pageTitle: '' };

  constructor(public inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.cmsID = params.id;
    });
    this.cmsID ? this.getCMSDetail() : this.grapesJsData = { gjsHtml: '', gjsCss: '' };
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

  setBreadcrumbs() {
    this.title = this.cmsID ? 'Edit CMS' : 'Add CMS'

    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'CMS Management', url: this.URLConstants.CMS },
      { localeKey: 'CMS', url: this.URLConstants.CMS },
      { localeKey: this.title, url: null },
    ];

    this.subHeaderData = {
      title: this.title,
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************************************/



  /*********************************************************************************
             @PURPOSE      : destroy grapesjs token
             @PARAMETERS   : {
                             TokenValues //any     
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
  /*********************************************************************************/

  /*********************************************************************************
               @PURPOSE      : api to get cms details
               @PARAMETERS   : {
                                cmsID: any 
                                }
  /*********************************************************************************/
  getCMSDetail() {
    this.commonService.callApi(this.callAPIConstants.cmsDetail + this.cmsID, this.cmsID, 'get', false, false).then((success) => {
      this.cms = success.data;
      this.setToken('gjshtml', success.data.gjsHtml);
      this.setToken('gjscss', success.data.gjsCss);
      this.grapesJsData = { gjsHtml: success.data.gjsHtml, gjsCss: success.data.gjsCss };
    });
  }

  /*********************************************************************************
               @PURPOSE      : api to update cms details
               @PARAMETERS   : {
                                cms: object //cms form details 
                                }
  /*********************************************************************************/
  submitCmsForm(form, cms) {
    this.submitted = true;
    if (form.valid && this.getToken('gjshtml')) {
      cms.gjsHtml = this.getToken('gjshtml');
      cms.gjsCss = this.getToken('gjscss');
      cms.description = this.getToken('gjs-inlined-html');;

      // cms.description = this.getToken('gjs-inlined-html');
      if (this.cmsID) { cms._id = this.cmsID; }
      this.commonService.callApi(this.callAPIConstants.cmsUpdate, cms, 'post', false, false).then((success) => {
        if (success.status === 1) {
          this.popToast('success', success.message);
          this.removeToken('gjshtml');
          this.removeToken('gjscss');
          this.removeToken('gjscomponents');
          this.removeToken('gjsstyles');
          this.removeToken('gjsassets');
          this.router.navigate([this.URLConstants.CMS]);
        } else {
          this.popToast('error', success.message);
        }
      });
    }
    if (!this.getToken('gjshtml')) {
      this.popToast('error', 'Provide Email Template');
    }
  }
}
 /*********************************************************************************/