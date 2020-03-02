import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styles: [],
})

export class SetPasswordComponent implements OnInit {
  public passwordData = { type: 'setPassword', headerTitle: 'Set Password', buttonTitle: 'Set Password' };

  constructor() {
  }

  ngOnInit() {
  }
}
