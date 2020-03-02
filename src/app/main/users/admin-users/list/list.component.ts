import { AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../common/commonComponent';
import { IBreadcrumbs, ITableSetupData } from '../../../../common/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent extends BaseComponent implements OnInit {
  public tableSetupData: ITableSetupData = { cols: [], actions: null, type: null, params: {}, conditions: {} };
  public accessPermission: any;
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  constructor(public inj: Injector) {
    super(inj);
    this.setBreadcrumbs();
    this.accessPermission = this.getRolePermissions("adminUser");

  }

  ngOnInit() {
    this.setDTableInitialData();
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
      { localeKey: 'Users Management', url: this.URLConstants.USERS },
      { localeKey: 'Admin Users', url: null },
    ];
    this.subHeaderData = {
      title: 'Admin Users',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*****************************************************************************/




  /*******************************************************************************
                @PURPOSE      : Set the Datatable config settings

                @PARAMETERS   : {
                                sort: Boolean            ==>Heading Name
                                isVisible: Boolean       ==>static column 
                                columnVisibility:Boolean ==>dynamic changing visibility of columns 
                                filter:any               ==>filter for that colName
 
                                }
  /*******************************************************************************/

  setDTableInitialData() {
    const tempData = [
      { type: 'multipleSelection', colName: 'Select', colFieldname: '', isVisible: true },
      { type: 'image', colName: 'Profile Image', colFieldname: 'photo', columnVisibility: true, isVisible: true },
      { type: 'text', colName: 'First Name', colFieldname: 'firstname', sort: true, columnVisibility: true, filter: true, isVisible: true },
      { type: 'text', colName: 'Last Name', colFieldname: 'lastname', sort: true, columnVisibility: true, filter: true, isVisible: true },
      { type: 'text', colName: 'E-mail', colFieldname: 'emailId', sort: true, columnVisibility: true, filter: true, isVisible: true },
      { type: 'text', colName: 'Phone Number', colFieldname: 'mobile', sort: true, columnVisibility: true, filter: true, isVisible: true },
      { type: 'adminRole', colName: 'Role', colFieldname: 'role', isVisible: true, sort: true, columnVisibility: true, filter: true, },
      { type: 'symbol', colName: 'Email Verification', colFieldname: 'emailVerificationStatus', columnVisibility: true, isVisible: true },
      { type: 'switch', colName: 'Status', colFieldname: 'status', columnVisibility: true, filter: true, isVisible: true },
      { type: 'action', colName: 'Action', colFieldname: '', isVisible: true },
    ];
    if (!this.accessPermission.edit) {
      this.hideActionInTable(tempData);
    }
    this.tableSetupData.cols = tempData;
    this.tableSetupData.type = 'adminUserlist';
    this.tableSetupData.actions = [
      { id: 2, buttonTitle: 'Edit', class: 'fa fa-pencil text-primary', type: 'icon', permission: this.accessPermission.edit },
      // { id: 3, buttonTitle: 'Delete', class: 'fa fa-trash text-danger', type: 'icon' },
    ];

    this.tableSetupData.params = { deleteParams: 'userIds', statusParams: 'userIds' };
    this.tableSetupData.conditions = {
      showTableHeader: true,
      showTableFooter: true,
      showApplyStatus: true,
      showExport: true,
      showColumnHide: true,
      showFilter: true,
      showFilterExport: true,
      showSaveFilter: true,
      showButton: { routerLink: this.URLConstants.ADDADMINUSER, buttonName: 'Add Admin User' },
    };
  }
  /******************************************************************************************/
}
