import { Component, Injector, OnInit } from '@angular/core';

// common
import { BaseComponent } from '../../../common/commonComponent';
import { IBreadcrumbs } from '../../../common/interfaces';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styles: [],
})
export class PaymentGatewayComponent extends BaseComponent implements OnInit {

  public stripeDetails: any = {};
  public twilioDetails: any = {};
  public submitted:boolean=false;

  constructor(public inj: Injector) {
    super(inj);
    this.setBreadcrumbs();
  }

  ngOnInit() {
    this.getPaymentDetails();
    this.getTwilioDetails()
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
      { localeKey: 'Credentials', url: null },
    ];
    this.subHeaderData = {
      title: 'Credentials',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/

  getPaymentDetails() {
    this.commonService.callApi(this.callAPIConstants.GetStripeDetails, '', 'get', false, false, false).then((success) => {
      this.stripeDetails = success.stripeObj;
      // this.twilioDetails = success.twilioObj;
    })
  }


  submitpaymentForm(paymentForm, stripeDetails) {
   
    if(paymentForm.valid)
    {
      this.commonService.callApi(this.callAPIConstants.updateStripeDetais, stripeDetails, 'post', false, false, false).then((success) => {
        success.status === 1 ? this.popToast('success', success.message) : this.popToast('error', success.message)
      })
    }
  }
  getTwilioDetails()
  {
    this.commonService.callApi(this.callAPIConstants.geTwilioDetails, '', 'get', false, false, false).then((success) => {
      this.twilioDetails = success.twilioObj;
  })
}
submiTwilioFormForm(twilioForm,twilioDetails)
  { this.submitted=true;
   
    if(twilioForm.valid)
    {
      this.commonService.callApi(this.callAPIConstants.updateTwilioDeatils, twilioDetails, 'post', false, false, false).then((success) => {
        success.status === 1 ? this.popToast('success', success.message) : this.popToast('error', success.message)
      })
    }
  }
}
