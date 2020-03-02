
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: [],
})

export class ResetPasswordComponent implements OnInit {
  public passwordData = { type: 'resetPassword', headerTitle: 'Reset Password', buttonTitle: 'Reset Password' };
  constructor() {
  }
  ngOnInit() {
  }
}
