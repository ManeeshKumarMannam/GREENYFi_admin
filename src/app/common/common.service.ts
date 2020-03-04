import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { APP_ID, Component, Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, map } from 'rxjs/operators';
// import base64  ;
import { config } from '../../assets/config/configs';

// plugins
import * as CryptoJS from 'crypto-js';
import swal from 'sweetalert2';

// constants
import { URLConstants } from './constants/routerLink-constants';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  authorised: any = false;
  constructor(
    public router: Router,
    public _http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.platformId = platformId;
    this._apiUrl = this.config.apiUrl;
    this.imagePath = this.config.imagePath
  }

  public swal = swal;
  public config = config as any;
  public _apiUrl = '';
  public imagePath = ''
  public platformId;

  public getToken(key) {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.getItem(key);
    }
  }
  public setToken(key, value) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem(key, value);
    }
  }

  /*******************************************************************************************
      @PURPOSE      	: 	Call api.
      @Parameters 	: 	{
            url : <url of api>
            data : <data object (JSON)>
            method : String (get, post)
            isForm (Optional) : Boolean - to call api with form data
            isPublic (Optional) : Boolean - to call api without auth header
          }
  /*****************************************************************************************/
  callApi(url, data, method, isPublic?, isForm?, html?): Promise<any> {

    let headers;
    if (isPublic) {
      headers = new HttpHeaders({ 'content-Type': 'application/json' });
    } else if (html) {
      headers = new HttpHeaders({ 'content-Type': 'text/html', 'Authorization': this.getToken('accessToken') });
    } else {
      headers = new HttpHeaders({ 'content-Type': 'application/json', 'Authorization': this.getToken('accessToken') });
    }
    if (isForm) {
      headers = new HttpHeaders({ Authorization: this.getToken('accessToken') });
    }
    return new Promise((resolve, reject) => {
      if (method == 'post') {
        this._http.post(this._apiUrl + url, data, { headers }).subscribe((data) => {
          resolve(data);
        }, (error) => {
          this.error(error);
        });
      } else if (method == 'get') {
        this._http.get(this._apiUrl + url, { headers, params: data }).subscribe((data) => {
          resolve(data);
        }, (error) => {
          this.error(error);
        });
      } else if (method == 'put') {
        // let params: { appid: 'id1234', cnt: '5' }
        this._http.put(this._apiUrl + url, data, { headers }).subscribe((data) => {
          resolve(data);
        }, (error) => {

        });
      } else if (method == 'delete') {
        // let params: { appid: 'id1234', cnt: '5' }
        this._http.delete(this._apiUrl + url, { headers }).subscribe((data) => {
          resolve(data);
        }, (error) => {
          this.error(error);
        });
      }
    });

  }

  callApiObservable(url, data) {
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': this.getToken('accessToken'),
    });
    return this._http.get(this._apiUrl + url, { headers, params: data }).pipe(map((rsp) => rsp));
  }

  /*****************************************************************************************/
  // @PURPOSE      	: 	To show server error
  /*****************************************************************************************/
  showServerError(e) {

    this.swal({
      position: 'center',
      type: 'error',
      text: 'Internal Server Error',
      showConfirmButton: false,
      timer: 1800,
      customClass: 'custom-toaster',
    });
  }
  /****************************************************************************/

  /*****************************************************************************************/
  // @PURPOSE      	: 	To show session LogOut popup
  /*****************************************************************************************/
  sessionLogOut() {
    window.localStorage.clear();
    this.swal({
      position: 'center',
      type: 'error',
      text: 'Session Timeout',
      showConfirmButton: false,
      timer: 1800,
      customClass: 'custom-toaster',
    });
    this.router.navigate([URLConstants.LOGIN]);
  }
  /****************************************************************************/

  /*****************************************************************************************/
  // @PURPOSE      	: 	To error on status 401(on unautorized login)
  /*****************************************************************************************/
  error(error) {
    if (error.status === 401) {
      this.sessionLogOut();
    }
    if (error.status === 422) {
      this.swal({
        position: 'center',
        type: 'error',
        text: 'Login Failed. Invalid credentials!',
        showConfirmButton: false,
        timer: 1800,
        customClass: 'custom-toaster',
      });
    }
  }
  /****************************************************************************/

  /*****************************************************************************************/
  // @PURPOSE      	: 	The set method is use for encrypt the value.
  /*****************************************************************************************/
  encrypt(data) {

    return CryptoJS.AES.encrypt(data, 'secret key 123');
  }
  /****************************************************************************/

  /*****************************************************************************************/
  // @PURPOSE      	: 	The get method is use for decrypt the value.
  /*****************************************************************************************/
  decrypt(data) {
    const value = CryptoJS.AES.decrypt(data, 'Rosity_admin');
    return JSON.parse(value.toString(CryptoJS.enc.Utf8));
  }
  /****************************************************************************/

}
