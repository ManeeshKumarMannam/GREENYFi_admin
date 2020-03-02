import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';
import { IBreadcrumbs } from '../../common/interfaces';

@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.component.html',
	styles: [],
})
export class MyProfileComponent extends BaseComponent implements OnInit {
	public email;
	public admin: any = { lastname: '', firstname: '', mobile: '', photo: '' };
	public submitted = false;
	public breadcrumbs: IBreadcrumbs[];
	public subHeaderData: any;
	constructor(inj: Injector) {
		super(inj);
		this.getAdminProfile();
		this.setBreadcrumbs();
	}

	ngOnInit() {
	}

	/*************************************************************************
			 @PURPOSE      : Set the Sub Header
			 @PARAMETERS   : {
							  localKey: string //Heading Name
							   URL: any       
							  }
	 /*************************************************************************/


	setBreadcrumbs() {
		this.breadcrumbs = [
			{ localeKey: 'home', url: this.URLConstants.DASHBOARD },
			{ localeKey: 'Profile Details', url: null },
		];
		this.subHeaderData = {
			title: 'Profile Details',
			breadcrumbs: this.breadcrumbs,
		};
	}
	/****************************************************************************/





	/****************************************************************************
		     @PURPOSE      : Get the Admin Profile Details
			 @PARAMETERS   : {
							  adminId: any //userId
							 }
	/****************************************************************************/
	getAdminProfile() {
		this.commonService.callApi(this.callAPIConstants.AdminGetProfile, '', 'get', false, false).then((success) => {
			if (success.status === 1) {
				this.admin.lastname = success.data.lastname;
				this.admin.firstname = success.data.firstname;
				this.admin.mobile = success.data.mobile;
				this.email = success.data.emailId;
			} else {
				this.popToast('error', success.message);
			}
		});
	}
	/********************************************************************************/



	/********************************************************************************
				 @PURPOSE      : submit the admin profile details
				 @PARAMETERS   : {
								  admin:object // admin details
								 }
	********************************************************************************/
	submitForm(adminForm, admin) {
		this.submitted = true;
		if (adminForm.valid) {
			this.commonService.callApi(this.callAPIConstants.AdminEditProfile, admin, 'post', false, false).then((success) => {
				if (success.status === 1) {
					this.popToast('success', 'Updated Successfully!');
					this.setToken('firstname', admin.firstname);
				} else {
					this.popToast('error', success.message);
				}
			});
		}
	}
	/********************************************************************************/

}
