import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [],
})
export class MainComponent extends BaseComponent implements OnInit {

  public currentYear: any = new Date().getFullYear();
  Verticalscrollbar: any = {};
  constructor(inj: Injector) {
    super(inj);
    if (!this.getToken('accessToken')) {
      this.router.navigate([this.URLConstants.LOGIN]);
    }
  }

  ngOnInit() {
  }

  overlayHide() {
    $('body').removeClass('asideleft-on');
    $('body').removeClass('asideleft-minimize');
  }
}
