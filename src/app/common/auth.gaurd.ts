import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { APP_ID, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router,
  RouterStateSnapshot,
} from '@angular/router';

// Component
import { BaseComponent } from './commonComponent';

/****************************************************************************
@PURPOSE      : Dont allow public pages to get accessed. (After Login)
@PARAMETERS   : N/A
@RETURN       : <boolean>
/****************************************************************************/
@Injectable()
export class CanLoginActivate extends BaseComponent implements CanActivate {
  constructor(inj: Injector) { super(inj); }
  canActivate() {
    if (!this.getToken('accessToken')) {
     

      return true;
    }
    this.router.navigate([this.URLConstants.DASHBOARD]);
   
    return false;
  }
}
/****************************************************************************/

/****************************************************************************
@PURPOSE      : Dont allow authorized pages to get accessed.  (Before Login)
@PARAMETERS   : N/A
@RETURN       : <boolean>
/****************************************************************************/
@Injectable()
export class CanAuthActivate extends BaseComponent implements CanActivate {
  constructor(inj: Injector) {
    super(inj);
  }
  canActivate() {
    return this.noAccessToAuthorizedPages();
  }
}
/****************************************************************************/

/****************************************************************************
@PURPOSE      : Allow children of main.module to get access after login
@PARAMETERS   : N/A
@RETURN       : <boolean>
/****************************************************************************/
@Injectable()
export class CanAuthActivateChild extends BaseComponent implements CanActivateChild {
  constructor(inj: Injector) {
    super(inj);
  }
  canActivateChild() {
    return this.noAccessToAuthorizedPages();
  }
}
/****************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access User pages if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanUserActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('user');


  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access User's DETAILS page if role is not permitted
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanUserDetailActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('user');


  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewDetails);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access Admin User page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanAdminUserActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('adminUser');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access Admin User's EDIT page if role is not permitted
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanEditAdminUserActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('adminUser');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.edit);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access Admin User's CREATE page if role is not permitted
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanCreateAdminUserActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('adminUser');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.create);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access CMS page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanCmsActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('cms');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
/************************************************************************************/


/***********************************************************************************
@PURPOSE      : won't allow to access Home page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanHomeactActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('cms');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
/************************************************************************************/



/***********************************************************************************
@PURPOSE      : won't allow to access Home page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanInquirytActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('inquiry');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
/************************************************************************************/


/***********************************************************************************
@PURPOSE      : won't allow to access Home page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanInquiryAddtActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('enquiryAccess');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewDetails);
  }
}
/************************************************************************************/


/***********************************************************************************
@PURPOSE      : won't allow to access CMS EDIT page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanEditCmsActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('cms');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.edit);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access CMS CREATE page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanCreateCmsActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('cms');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.create);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access Admin Email page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanAdminEmailActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('adminEmail');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access Email Template page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanEmailTemplateActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('EmailTemplate');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access Email Template's EDIT page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanEditEmailTemplateActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('EmailTemplate');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.edit);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access Email Template's CREATE page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanCreateEmailTemplateActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('EmailTemplate');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.create);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access Manage Role page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanManageRoleActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('role');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access Manage Role's EDIT page if role is not permitted
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanEditManageRoleActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('role');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.edit);
  }
}
/************************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access Manage Role's CREATE page if role is not permitted
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanCreateManageRoleActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('role');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.create);
  }
}
/************************************************************************************/



/***********************************************************************************
@PURPOSE      : won't allow to access Master management if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanCharitytActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('charity');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.rolePermission.charityAccess.viewList);
  }
}
/************************************************************************************/


/***********************************************************************************
@PURPOSE      : won't allow to access Master management if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanAddCharitytActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('charity');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.create);
  }
}
/************************************************************************************/


/***********************************************************************************
@PURPOSE      : won't allow to access Master management if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanEditCharitytActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('charity');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.edit);
  }
}
/************************************************************************************/



/***********************************************************************************
@PURPOSE      : won't allow to access Causes if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanCausetActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('causes');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
/************************************************************************************/



/***********************************************************************************
@PURPOSE      : won't allow to access transactions if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanTransactionsActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('transaction');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
/************************************************************************************/




/***********************************************************************************
@PURPOSE      : won't allow to access transactions if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanTransactionViewsActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('transaction');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewDetails);
  }
}
/************************************************************************************/



/****************************************************************************
@PURPOSE      : Dont allow public pages to get accessed. (After Login)
@PARAMETERS   : N/A
@RETURN       : <boolean>
/****************************************************************************/
@Injectable()
export class CanSettinginActivate extends BaseComponent implements CanActivate {
  constructor(inj: Injector) { super(inj); }
  canActivate() {
    if ((this.getToken('accessToken') && this.getToken('role') == 'Super Admin')) {
      return true;
    }
    this.router.navigate([this.URLConstants.DASHBOARD]);
    return false;
  }
}
/****************************************************************************/



/****************************************************************************
@PURPOSE      : Dont allow public pages to get accessed. (After Login)
@PARAMETERS   : N/A
@RETURN       : <boolean>
/****************************************************************************/
@Injectable()
export class CanSMTPinActivate extends BaseComponent implements CanActivate {
  constructor(inj: Injector) { super(inj); }
  canActivate() {
    if ((this.getToken('accessToken') && this.getToken('role') == 'Super Admin')) {
      return true;
    }
    this.router.navigate([this.URLConstants.DASHBOARD]);
    return false;
  }
}
/****************************************************************************/

/***********************************************************************************
@PURPOSE      : won't allow to access about  page if role is not permitted for access
@PARAMETERS   : N/A
@RETURN       : <boolean>
/***********************************************************************************/
@Injectable()
export class CanAboutUSActivate extends BaseComponent implements CanActivate {
  public role: any;

  constructor(inj: Injector) {
    super(inj);
    this.role = this.getRolePermissions('cms');
  }
  canActivate() {
    return this.CanActivateFalseRouteDashboard(this.role.viewList);
  }
}
