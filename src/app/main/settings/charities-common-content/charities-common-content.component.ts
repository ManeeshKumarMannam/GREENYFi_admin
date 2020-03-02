import { Component, OnInit, Injector, NgZone, ViewChild } from '@angular/core';

// common
import { BaseComponent } from '../../../common/commonComponent';
import { IBreadcrumbs } from '../../../common/interfaces';
import { GrapesJSComponent } from '../../../reusable/grapes-js/grapes-js.component';
@Component({
  selector: 'app-charities-common-content',
  templateUrl: './charities-common-content.component.html',
  styles: []
})
export class CharitiesCommonContentComponent extends BaseComponent implements OnInit {

  public submitted: boolean = false;
  public content: any = {};
  public grapesJsDataCommon: any;
  public gjsCommon = 'gjsCommon';
  public typeCommon = 'typeCommon';
  @ViewChild(GrapesJSComponent) GrapesJSComponent: GrapesJSComponent;
  public grape: boolean;
  constructor(public inj: Injector, public zone: NgZone) {
    super(inj);
    this.setBreadcrumbs();
  }

  ngOnInit() {
    this.getContentDetails()
    this.grapesJsDataCommon = { gjsHtml: '', gjsCss: '' };
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
      { localeKey: 'Charities common content', url: null },
    ];
    this.subHeaderData = {
      title: 'Charities common content',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/

  /*************************************************************/
  // @purpose : Getting the details of common content
  /*************************************************************/
  getContentDetails(data?) {
    if (data == 'cancel') {
      this.removeToken('gjsCommonhtml');
      this.removeToken('gjsCommoncomponents');
      this.removeToken('gjsCommonassets');
      this.removeToken('gjsCommoncss');
      this.removeToken('gjsCommonstyles');
      this.removeToken('gjs-inlined-html')
      this.grape = false
    }
    this.commonService.callApi(this.callAPIConstants.GetCommonContent, '', 'get', false, false, false).then((success) => {
      if (success.status == 1) {

        this.content = success.data;
        this.setToken('gjsCommonhtml', this.content.commonDescriptionHtml);
        this.setToken('gjsCommoncss', this.content.commonDescriptionCss);
        this.grape = true
      } else {
        this.popToast('error', success.message)
      }
    })
  }
  /*************************************************************/

  /*************************************************************/
  // @purpose : Updating the details of common content
  /*************************************************************/
  submitCommonContentForm(form, content) {
    if (form.valid) {
      content.commonDescriptionHtml = this.getToken('gjsCommonhtml');
      content.commonDescriptionCss = this.getToken('gjsCommoncss');
      content.commonDescription = this.getToken('gjs-inlined-html');
      this.commonService.callApi(this.callAPIConstants.UpdateCommonContent, content, 'post', false, false, false).then((success) => {
        success.status === 1 ? this.popToast('success', success.message) : this.popToast('error', success.message)
      })
    }
  }
  /*************************************************************/

  ngOnDestroy() {
    this.removeToken('gjsCommonhtml');
    this.removeToken('gjsCommoncomponents');
    this.removeToken('gjsCommonassets');
    this.removeToken('gjsCommoncss');
    this.removeToken('gjsCommonstyles');
    this.removeToken('gjs-inlined-html')
  }

}
