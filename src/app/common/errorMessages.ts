import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { messages } from './errorMessagesData';

@Injectable()
export class ErrorMessages {
  public MSG = (messages as any);

  constructor() { }
  getError(field, error) {

    let message = '';
    if (error) {
      if (error.required) {
        const required = this.MSG.ERROR.REQUIRED;
        switch (field) {
          case 'username':
            {
              message = required.Username;
            }
            break;

          case 'mobile':
            {
              message = required.mobile;
            }
            break;
          case 'password':
            {
              message = required.Password;
            }
            break;
          case 'oldPassword':
            {
              message = required.currentPassword;
            }
            break;

          case 'amount':
            {
              message = required.Amount;
            }
            break;
          case 'newPassword':
            {
              message = required.newPassword;
            }
            break;
          case 'confirmPassword':
            {
              message = required.confirmPassword;
            }
            break;
          case 'activity':
            {
              message = required.activity;
            }
            break;
          case 'remark':
            {
              message = required.remark;
            }
            break;

          case 'firstname':
            {
              message = required.firstname;
            }
            break;
          case 'lastname':
            {
              message = required.lastname;
            }
            break;
          case 'phoneNo':
            {
              message = required.PhoneNo;
            }
            break;

          case 'technology':
            {
              message = required.technology;
            }
            break;

          case 'emailId':
            {
              message = required.emailId;
            }
            break;

          case 'roleName':
            {
              message = required.roleName;
            }
            break;

          case 'filterName':
            {
              message = required.filterName;
            }
            break;

          case 'emailKey':
            {
              message = required.emailKey;
            }
            break;

          case 'subject':
            {
              message = required.subject;
            }
            break;

          case 'fromEmail':
            {
              message = required.fromEmail;
            }
            break;

          case 'emailTemplateId':
            {
              message = required.emailTemplateId;
            }
            break;

          case 'host':
            {
              message = required.host;
            }
            break;

          case 'port':
            {
              message = required.port;
            }
            break;

          case 'defaultFromEmail':
            {
              message = required.defaultFromEmail;
            }
            break;

          case 'metaTitle':
            {
              message = required.metaTitle;
            }
            break;

          case 'metaDescription':
            {
              message = required.metaDescription;
            }
            break;

          case 'metaKeyword':
            {
              message = required.metaKeyword;
            }
            break;

          case 'pageTitle':
            {
              message = required.pageTitle;
            }
            break;

          case 'currency':
            {
              message = required.currency;
            }
            break;

          case 'dateFormat':
            {
              message = required.dateFormat;
            }
            break;

          case 'defaultAdminEmail':
            {
              message = required.defaultAdminEmail;
            }
            break;

          case 'title':
            {
              message = required.title;
            }
            break;
          case 'subTitle':
            {
              message = required.subTitle;
            }
            break;
          case 'titleDescription':
            {
              message = required.titleDescription;
            }
            break;
          case 'aboutUsTitle':
            {
              message = required.aboutUsTitle;
            }
            break;
          case 'numberOfcharities':
            {
              message = required.numberOfcharities;
            }
            break;
          case 'charitiesDescription':
            {
              message = required.charitiesDescription;
            }
            break;
          case 'numberOfVolunteers':
            {
              message = required.numberOfVolunteers;
            }
            break;
          case 'volunteersDescription':
            {
              message = required.volunteersDescription;
            }
            break;
          case 'numberOfDonations':
            {
              message = required.numberOfDonations;
            }
            break;

          case 'stepsToRegTitle':
            {
              message = required.stepsToRegTitle;
            }
            break;
          case 'donationDescription':
            {
              message = required.donationDescription;
            }
            break;
          case 'donationWaysTitle':
            {
              message = required.donationWaysTitle;
            }
            break;
          case 'stepsToRegDescription':
            {
              message = required.stepsToRegDescription;
            }
            break;
          case 'donationWayOne':
            {
              message = required.donationWayOne;
            }
            break;
          case 'causesTitle':
            {
              message = required.causesTitle;
            }
            break;
          case 'charitiesTitle':
            {
              message = required.charitiesTitle;
            }
            break;

          case 'donationTitle':
            {
              message = required.donationTitle;
            }
            break;
          case 'description':
            {
              message = required.description;
            }
            break;

          case 'email':
            {
              message = required.email;
            }
            break;
          case 'name':
            {
              message = required.name;
            }
            break;
          case 'Description':
            {
              message = required.Description;
            }
            break;
          case 'subDescription':
            {
              message = required.subDescription;
            }
            break;
          case 'phone':
            {
              message = required.phone;
            }
            break;
          case 'txnId':
            {
              message = required.txnId;
            }
            break;
          case 'ratingValue':
            {
              message = required.ratingValue;
            }
            break;
          case 'rating':
            {
              message = required.rating;
            }
            break;
          case 'ratingName':
            {
              message = required.ratingName;
            }
            break;
          case 'score':
            {
              message = required.score;
            }
            break;
          case 'subTitleDescription':
            {
              message = required.subTitleDescription;
            }
            break;
          case 'question':
            {
              message = required.question;
            }
            break;
          case 'answer':
            {
              message = required.answer;
            }
            break;
          case 'message':
            {
              message = required.message;
            }
            break;
          case 'stripePublishableKeyProduction':
            {
              message = required.stripePublishableKeyProduction;
            }
            break;
          case 'twilioAuthToken':
            {
              message = required.twilioAuthToken;
            }
            break;
          case 'twilioPhNumber':
            {
              message = required.twilioPhNumber;
            }
            break; case 'twilioAccountSId':
            {
              message = required.twilioAccountSId;
            }
            break;
            break; case 'stripeScretKeyProduction':
            {
              message = required.stripeScretKeyProduction;
            }
            break;
        }
      } else if (error.pattern) {
        const pattern = this.MSG.ERROR.PATTERN;
        switch (field) {
          case 'emailId':
            { message = pattern.Email; }
            break;
          case 'webSite':
            { message = pattern.webSite; }
            break;
          case 'adminEmail':
            { message = pattern.adminEmail; }
            break;
          case 'fromEmail':
            { message = pattern.fromEmail; }
            break;
          case 'defaultFromEmail':
            { message = pattern.Email; }
            break;
          case 'defaultAdminEmail':
            { message = pattern.Email; }
            break;
          case 'newPassword':
            { message = pattern.Password; }
            break;
          case 'txnId':
            { message = pattern.txnId; }
            break;
          case 'score':
            { message = pattern.score; }
            break;
        }
      } else if (error.minlength) {
        const minlength = this.MSG.ERROR.MINLENGTH;
        switch (field) {
          case 'mobile':
            { message = minlength.PhoneNo; }
            break;
          case 'confirmPassword':
            { message = minlength.confirmPassword; }
            break;
          case 'newPassword':
            { message = minlength.newPassword; }
            break;
          case 'port':
            { message = minlength.port; }
            break;
        }
      } else if (error.maxlength) {
        const maxlength = this.MSG.ERROR.MAXLENGTH;
        switch (field) {
          case 'subDescription':
            { message = maxlength.subDescription; }
            break;
        }
      }
    }else {
      const newError = this.MSG.ERROR.CUSTOM;
      switch (field) {
        case "score": { message = newError.score } break;
      }
    }
    return message;
  }
}
