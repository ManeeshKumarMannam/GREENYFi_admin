import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public user: any = {};
  public submitted = false;
  public role_permission: any;
  constructor(inj: Injector) {
    super(inj);
  }

  ngOnInit() {
    if (this.getToken('inic_id') != null && this.getToken('inic_pass') != null) {
      this.user = {
        emailId: this.getToken('inic_id'),
        password: this.commonService.decrypt(this.getToken('inic_pass')),
        rememberMe: true,
      };
    }
  }


  /************************************************************************
          @PURPOSE       : Allow the users to login 
          @PARAMETERS    : {
                             user: object //login details
                           }
  *************************************************************************/
  onLogin(form, user) {
    this.submitted = true;
    if (form.valid) {
      if (user.rememberMe) {
        this.setToken('inic_id', user.emailId);
        this.setToken('inic_pass', this.commonService.encrypt(user.password));
      } else {
        this.removeToken('inic_id');
        this.removeToken('inic_pass');
      }

      const fromObject = {
        emailId: user.emailId,
        password: user.password,
      };
      this.commonService.callApi(this.callAPIConstants.AdminLogin, fromObject, 'post', true, false).then((success) => {
        if (success.status === 1) {
          // this.broadcaster.broadcast('role_permission');
          this.setToken('role_permission', CryptoJS.AES.encrypt(JSON.stringify(success.data.rolePermission), "Rosity_admin"));
          this.setToken('role', success.data.role.role);
          this.setToken('accessToken', success.access_token);
          this.setToken('firstname', success.data.firstname);
          this.setToken('lastname', success.data.lastname);
          this.popToast('success', success.message);
          this.router.navigate([this.URLConstants.DASHBOARD]);
        } else {
          this.popToast('error', 'Login Failed. Invalid credentials!');
        }
      });
    }
  }
  /*************************************************************************/





  /************************************************************************
          @PURPOSE       : To send reset-password link to the user
          @PARAMETERS    : {
                             emailId: object //login email id
                           }
  *************************************************************************/
  showForgotPassword() {
    this.swal({
      title: 'Forgot Password',
      text: 'Please enter the registered email id. You will receive reset password link.',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-outline-primary',
      preConfirm: (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const data = {
              emailId: email,
            };
            this.commonService.callApi(this.callAPIConstants.AdminForgotPassword, data, 'post', true, false).then((success) => {
              if (success.status === 1) {
                this.popToast('success', success.message);
              } else {
                this.popToast('error', success.message);
              }
            });
          }, 500);
        });
      },
      allowOutsideClick: () => !this.swal.isLoading(),
    }).then((result) => {
      if (result.value) {
        if (result.value.status) {
          this.swal({
            type: 'success',
            title: 'Link Sent',
            html: result.value.message,
          });
        } else {
          this.swal({
            type: 'error',
            title: 'Error',
            html: result.value.message,
          });
        }
      }
    });
  }
}
/*************************************************************************/