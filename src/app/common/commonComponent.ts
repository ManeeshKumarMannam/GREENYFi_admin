import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_ID, Component, Injector, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { makeStateKey, Meta, Title, TransferState } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as jQuery from 'jquery';
declare var $: any;
import * as CryptoJS from 'crypto-js';
// plugin
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { Broadcaster } from './broadCaster';

// common
import { CommonService } from './common.service';
import { ErrorMessages } from './errorMessages';

// constants
import { callAPIConstants } from './constants/callAPI-constants';
import { URLConstants } from './constants/routerLink-constants';

@Component({
  selector: 'app-parent-comp',
  template: ``,
  providers: [],
})

export class BaseComponent {

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.platformId = injector.get(PLATFORM_ID);
    this.appId = injector.get(APP_ID);
    this.commonService = injector.get(CommonService);
    this.errorMessage = injector.get(ErrorMessages);
    this.http = injector.get(HttpClient);
    this.titleService = injector.get(Title);
    this.metaService = injector.get(Meta);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.modalService = injector.get(BsModalService);
    this.BsModalRef = injector.get(BsModalRef);
    this.baseUrl = this.commonService._apiUrl;
    this.imagePath = this.commonService.imagePath
    this.spinner = injector.get(NgxSpinnerService);
    this.broadcaster = injector.get(Broadcaster);
    this.sanitize = injector.get(DomSanitizer);
    if (this.getToken('role_permission')) {
      this.rolePermission = this.commonService.decrypt(this.getToken('role_permission'))
      // const value = CryptoJS.AES.decrypt(this.getToken('role_permission'), 'Rosity_admin');

    }

  }
  public rolePermission;
  public sanitize: DomSanitizer;
  public BsModalRef: BsModalRef;
  public activatedRoute: ActivatedRoute;
  public errorMessage: ErrorMessages;
  public modalService: BsModalService;
  public swal = swal;
  public titleService: Title;
  public metaService: Meta;
  public platformId: any;
  public appId: any;
  public http: any;
  public router: Router;
  public commonService: CommonService;
  public baseUrl;
  public imagePath;
  public $ = jQuery;
  public spinner: NgxSpinnerService;
  public broadcaster: Broadcaster;
  URLConstants = URLConstants;
  public callAPIConstants = callAPIConstants;

  public uploadImageUrl = 'http://seedapi.node.indianic.com/public/upload/images/';

  // *************************************************************//
  // @Purpose : To check server or browser
  // *************************************************************//
  isBrowser() {
    if (isPlatformBrowser(this.platformId)) {
      return true;
    } else {
      return false;
    }
  }

  // *************************************************************//
  // @Purpose : We can use following function to use localstorage
  // *************************************************************//
  setToken(key, value) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem(key, value);
    }
  }
  getToken(key) {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.getItem(key);
    }
  }
  removeToken(key) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem(key);
    }
  }
  clearToken() {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.clear();
    }
  }

  // *************************************************************//
  // @Purpose : We can use following function to use Toaster Service.
  // *************************************************************//
  popToast(type, title) {
    swal({
      position: 'center',
      type,
      text: title,
      showConfirmButton: false,
      timer: 3000,
      customClass: 'custom-toaster',

    });
  }

  confirmpopToast(type, title) {
    return swal({

      // title: 'Are you sure?',
      text: title,
      type,
      showCancelButton: true,
      confirmButtonText: 'DELETE',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn--outline-primary',

    });
  }

  /****************************************************************************
  @PURPOSE      : To restrict or allow some values in input.
  @PARAMETERS   : $event
  @RETURN       : Boolen
  ****************************************************************************/
  RestrictSpace(e) {
    if (e.keyCode === 32) {
      return false;
    } else {
      return true;
    }
  }

  AllowNumbers(e) {

    let input;

    if (e.metaKey ||
      e.ctrlKey) {

      return true;

    }
    if (e.which === 32) {

      return false;

    }
    if (e.which === 0) {

      return true;

    }
    if (e.which < 33) {

      return true;

    }
    if (e.which === 43 ||
      e.which === 45) {

      return true;

    }
    if (e.which === 36 ||
      e.which === 35) {

      return true;

    }
    if (e.which === 37 ||
      e.which === 39) {

      return true;

    }

    input = e.key;

    return !!/[\d\s]/.test(input);

  }
  alowRatingValues(e) {

    if (((e.key <= 5) || e.key == '.') && e.key != 0) {
      return true;
    } else {
      return false
    }
  }

  AllowChar(e) {
    if ((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 96 && e.keyCode < 123) || e.keyCode === 8) {
      return true;
    } else {
      return false;
    }
  }
  /****************************************************************************/

  /****************************************************************************/
  // @Logout
  /****************************************************************************/
  logout() {
    let inic_id;
    let inic_pass;
    let remember;
    if (this.getToken('inic_id') && this.getToken('inic_pass')) {
      inic_id = this.getToken('inic_id');
      inic_pass = this.getToken('inic_pass');
      remember = true;
    }
    this.commonService.callApi(this.callAPIConstants.AdminLogout, '', 'get', false, false, false).then((success) => {
      if (success.status === 1) {
        this.router.navigate([URLConstants.LOGIN]);
        this.clearToken();
        if (remember) {
          this.setToken('inic_id', inic_id);
          this.setToken('inic_pass', inic_pass);
        }
      }
    });
  }
  /****************************************************************************/

  /****************************************************************************
  @PURPOSE      : To show validation message
  @PARAMETERS   : <field_name, errorObj?>
  @RETURN       : error message.
  ****************************************************************************/
  showError(field, errorObj?) {
  
    
    return this.errorMessage.getError(field, errorObj);
  }
  /****************************************************************************/

  /****************************************************************************/
  // Get Profile Image
  /****************************************************************************/
  getProfile() {
    const url = this.getToken('ss_pic');
    if (url == null || url === ' ') {
      return 'assets/images/NoProfile.png';
    } else {
      return url;
    }
  }
  /****************************************************************************/

  /****************************************************************************/
  // Get Pemission according to role
  /****************************************************************************/
  // getRolePermissions() {
  //   return this.commonService.decrypt(this.getToken('role_permission'));
  // }
  getRolePermissions(key) {
    let role;
    if (this.getToken('role_permission')) {
      role = this.commonService.decrypt(this.getToken('role_permission'));


      let roleKey: any;
      switch (key) {
        case 'user': roleKey = role['user-GuestUserAccess'];
          break;
        case 'adminUser': roleKey = role.adminUserAccess;
          break;
        case 'cms': roleKey = role.contentManagementAccess;
          break;
        case 'role': roleKey = role.rolesAccess;
          break;
        case 'adminEmail': roleKey = role.emailSettingsAccess;
          break;
        case 'EmailTemplate': roleKey = role.emailTemplateAccess;
          break;
        case 'inquiry': roleKey = role.enquiryAccess;
          break;
        case 'transaction': roleKey = role.transactionsAccess;
          break;
        case 'charity': roleKey = role.charityAccess;
          break;
        case 'causes': roleKey = role.causeAccess;
          break;
      }
      return roleKey;
    }
  }

  hideActionInTable(tempData) {
    const index = tempData.findIndex((o) => o.type === 'action');
    tempData[index].isVisible = false;
  }
  /****************************************************************************/

  /****************************************************************************/
  // common function for AUTH GUARD (if returns false then routes to Dashboard)
  /****************************************************************************/

  CanActivateFalseRouteDashboard(condition) {


    if (condition) {
      return true;
    }
    this.router.navigate([this.URLConstants.DASHBOARD]);
    return false;
  }

  noAccessToAuthorizedPages() {
    if (this.getToken('accessToken')) {
      return true;
    }
    this.router.navigate([this.URLConstants.LOGIN]);
    return false;
  }

  /****************************************************************************
  //For Side menu toggle
  /****************************************************************************/
  slideLeft() {
    // tslint:disable-next-line: no-duplicate-string
    $('body').addClass('slide-open');
  }
  removeSlide() {
    $('body').removeClass('slide-open');
  }
  slideClose() {
    $('body').removeClass('slide-open');
  }
  /****************************************************************************/
}
