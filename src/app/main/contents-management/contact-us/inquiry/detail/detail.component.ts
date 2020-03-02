import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/common/commonComponent';
import { IBreadcrumbs } from '../../../../../common/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent extends BaseComponent implements OnInit {
  public inquiry: any = {}
  public submitted = false;
  public faqID: any;
  public apiName;
  inquiryDeatils = {};
  public title;
  constructor(inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.faqID = params.id;


      if (this.faqID) {
        this.inquiryDetail()
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
    const title = this.faqID ? 'Inquiry Details' : 'Add Inquiry';

    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Content Management', url: this.URLConstants.FAQ },
      { localeKey: 'Contact Us', url: this.URLConstants.FAQ },
      { localeKey: 'Inquiry', url: this.URLConstants.INQUIRY },
      { localeKey: title, url: null },
    ];
    this.subHeaderData = {
      title,
      breadcrumbs: this.breadcrumbs,
    };

  }

  /*********************************************************************************
            @PURPOSE      : submit Inquiry Form
            @PARAMETERS   : {
                             inquiry: object //inquiry Form Details
                             }
 /*********************************************************************************/
  submitInquiryForm(form, inquiry) {
    this.submitted = true;
    if (form.valid) {
      if (this.faqID != undefined) {
        inquiry.faqId = this.faqID;
        this.apiName = this.callAPIConstants.updateFaq;
      } else {
        this.apiName = this.callAPIConstants.inquiryAdd;
      }
      this.commonService.callApi(this.apiName, inquiry, 'post').then(success => {
        if (success.status === 1) {
          this.popToast('success', "Inquiry Added Successfully");
          this.router.navigate([this.URLConstants.INQUIRY]);
        } else {
          this.popToast('error', success.message)
        }
      })
    }
  }
  /*********************************************************************************/



  /*********************************************************************************
            @PURPOSE      :api to get Inquiry details  
            @PARAMETERS   : {
                             faqID: any //inquiryID
                             }
            @Return        : Array of objects //faq details         
 /*********************************************************************************/

  inquiryDetail() {
    let faqId = {}
    faqId = this.faqID
    this.commonService.callApi(this.callAPIConstants.inquiryDetails + faqId, '', 'get').then((success) => {
      this.inquiryDeatils = success.data;
    });
  }
}
