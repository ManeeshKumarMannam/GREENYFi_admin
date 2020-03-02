import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/common/commonComponent';
import { IBreadcrumbs } from '../../../../../common/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent extends BaseComponent implements OnInit {
  public faq: any = {}
  public submitted = false;
  public faqID: any;
  public apiName;
  constructor(inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.faqID = params.id;
      if (this.faqID) {
        this.faqDetail()
      }
    });
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
    const title = this.faqID ? 'Edit FAQ' : 'Add FAQ';
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Content Management', url: this.URLConstants.FAQ },
      { localeKey: 'Contact Us', url: this.URLConstants.FAQ },
      { localeKey: 'FAQ', url: this.URLConstants.FAQ },
      { localeKey: title, url: null },
    ];
    this.subHeaderData = {
      title,
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*********************************************************************************/


  /*********************************************************************************
              @PURPOSE      : submit the  FaqForm
              @PARAMETERS   : {
                               faq: object //faq form details
                              }
   /*********************************************************************************/
  submitFaqForm(form, faq) {
    this.submitted = true;
    if (form.valid) {
      if (this.faqID != undefined) {
        faq.faqId = this.faqID;
        this.apiName = this.callAPIConstants.updateFaq;
      } else {
        this.apiName = this.callAPIConstants.faqAdd;
      }
      this.commonService.callApi(this.apiName, faq, 'post').then(success => {
        if (success.status === 1) {
          this.popToast('success', "Faq Added Successfully");
          this.router.navigate([this.URLConstants.FAQ]);
        } else {
          this.popToast('error', success.message)
        }
      })
    }
  }
  /*********************************************************************************/

  /*********************************************************************************
             @PURPOSE      : api to get cms details
             @PARAMETERS   : {
                              faqId: any //faq Id
                             }
  /*********************************************************************************/
  faqDetail() {
    let faqId = {}
    faqId = this.faqID
    this.commonService.callApi(this.callAPIConstants.GetFAQDetails + faqId, '', 'get').then((success) => {
      this.faq = success.data;
    });
  }
  /*********************************************************************************/

}
