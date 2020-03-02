import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styles: [],
})
export class PasswordComponent extends BaseComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('passwordData') passwordData;
  public getMethodName: any;
  public token: any;

  constructor(public inj: Injector) {
    super(inj);
    this.token = this.router.parseUrl(this.router.url).queryParams['token'];
  }

  ngOnInit() {
    if (this.passwordData.type === 'setPassword') {
      this.getMethodName = this.callAPIConstants.AdminSetPassword;
    } else if (this.passwordData.type === 'resetPassword') {
      this.getMethodName = this.callAPIConstants.AdminResetPassword;
    }
  }
  /*************************************************************/
  // set or reset password
  /*************************************************************/
  public password: any = {};
  public submitted = false;
  onSubmitPassword(passwordForm, password) {
    this.submitted = true;
    if (passwordForm.valid) {
      if (password.password !== password.confirmpassword) {
        this.popToast('error', 'New Password and confirm password must be same.');
        passwordForm.reset();
        return false;
      }
      const fromObject = {
        token: this.token,
        password: password.password,
      };
      this.commonService.callApi(this.getMethodName, fromObject, 'post', true, false).then((success) => {
        if (success.status === 1) {
          this.popToast('success', success.message);
          passwordForm.reset();
          // this.router.navigate([this.URLConstants.LOGIN]);
        } else {
          this.popToast('error', success.message);
        }
      });
    }
  }
  /*************************************************************/
}
