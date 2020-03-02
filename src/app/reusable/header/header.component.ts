import { Component, DoCheck, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [],
})
export class HeaderComponent extends BaseComponent implements OnInit, DoCheck {
	public user: any;
	public firstname: any;

	constructor(inj: Injector) {
		super(inj);
	}

	ngOnInit() {
		this.getProfile();
		// this.sidepanelOnOff()
		$('[data-toggle="offcanvas"]').on('click', () => {
			$('.sidebar-offcanvas').toggleClass('active');
		});
		$('body').addClass('asideleft-maximize');
	}

	ngDoCheck() {
		this.firstname = this.getToken('firstname');
	}

	sidepanel() {
		$('body').toggleClass('asideleft-minimize');
		$('body').toggleClass('asideleft-maximize');
	}
	sidepanelOnOff() {
		$('body').toggleClass('asideleft-minimize');
		$('body').toggleClass('asideleft-maximize');
		// $("body").toggleClass("asideleft-minimize");
	}
}
