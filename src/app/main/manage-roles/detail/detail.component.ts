import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { IBreadcrumbs } from '../../../common/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent extends BaseComponent implements OnInit {
  public roleId: any;
  public role: any[] = [];

  constructor(public inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.roleId = params.id;
    });
    this.getRoleDetail();
    this.setBreadcrumbs();
  }

  ngOnInit() {
  }

  /*************************************************************/
  // Sub Header
  /*************************************************************/
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  setBreadcrumbs() {
    const title = this.roleId ? 'Edit Role' : 'Add New Role';
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Manage Role', url: this.URLConstants.MANAGE_ROLES },
      { localeKey: title, url: null },
    ];
    this.subHeaderData = {
      title,
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/

  // api to get role details
  getRoleDetail() {
    this.commonService.callApi(this.callAPIConstants.GetRoleDetail + this.roleId, '', 'get', false, false).then((success) => {
      success.data.categoryPermissions.forEach((successElement) => {
        successElement.permissions.forEach((element) => {
          if (!element.isSelected) {
            element.isSelected = false;
          }
        });
      });
      this.role = success.data;
    });
  }

  // api to save new role or update role
  public submitted = false;
  public rolePermissions: any[] = [];
  submitRole(form, role) {
    this.submitted = true;
    if (form.valid) {
      role.categoryPermissions.forEach((permissionsArr) => {
        permissionsArr.permissions.forEach((element) => {
          if (element.isSelected === true) {
            this.rolePermissions.push(element._id);
          }
        });
      });
      let roleData;
      this.roleId ?
        roleData = { id: role._id, role: role.role, permissions: this.rolePermissions } :
        roleData = { role: role.role, permissions: this.rolePermissions };
      if (roleData.role == 'super admin' || roleData.role == 'Super Admin' || roleData.role == 'Super admin' || roleData.role == 'super Admin') {
        this.popToast("error", "Sorry, You can not create Role with this name!")
      }
      else {
        if (this.rolePermissions.length) {
          this.commonService.callApi(this.callAPIConstants.AddUpdateRole, roleData, 'post', false, false).then((success) => {
            if (success.status === 1) {
              this.router.navigate([this.URLConstants.MANAGE_ROLES])
              this.popToast('success', 'Successfully stored!')
            }
            else {
              this.popToast('error', success.message);
            }
          });
        } else { this.popToast('error', 'Give atleast 1 permission'); }
      }
    }
  }
}
