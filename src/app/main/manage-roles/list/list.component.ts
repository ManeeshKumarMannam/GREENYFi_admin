import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { IBreadcrumbs, ITableSetupData } from '../../../common/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent extends BaseComponent implements OnInit {
  tableSetupData: ITableSetupData = { cols: [], actions: null, type: null, params: {}, conditions: {} };
  public accessPermission: any;

  constructor(public inj: Injector) {
    super(inj);
    this.setBreadcrumbs();
    // START: Role Permission //
    this.accessPermission = this.getRolePermissions('role');


    // END: Role Permission //
  }

  ngOnInit() {
    this.setDTableInitialData();
  }

  /*************************************************************/
  // Sub Header
  /*************************************************************/
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  setBreadcrumbs() {
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Manage Role', url: null },
    ];
    this.subHeaderData = {
      title: 'Manage Role',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/

  /*************************************************************/
  // Datatable config settings
  /*************************************************************/

  // sort:Boolean ==> to enable sorting
  // isVisible:Boolean ==>  show static column
  // columnVisibility:Boolean ==> dynamic changing visibility of columns
  // filter ==> filter for that colName

  setDTableInitialData() {
    const tempData = [
      { type: 'multipleSelection', colName: 'Select', colFieldname: '', isVisible: true },
      { type: 'text', colName: 'Role Name', colFieldname: 'role', isVisible: true, sort: false, filter: true },
      { type: 'switch', colName: 'Status', colFieldname: 'status', isVisible: true, sort: false, filter: true },
      { type: 'action', colName: 'Action', colFieldname: '', isVisible: true },
    ];
    if (!this.accessPermission.edit) {
      this.hideActionInTable(tempData);
    }
    this.tableSetupData.cols = tempData;
    this.tableSetupData.type = 'roleList';
    this.tableSetupData.actions = [
      { id: 2, buttonTitle: 'Edit', class: 'fa fa-pencil text-primary', type: 'icon', permission: this.accessPermission.edit },
    ];
    this.tableSetupData.params = { deleteParams: 'ids', statusParams: 'ids' };
    this.tableSetupData.conditions = {
      showTableHeader: true,
      showTableFooter: true,
      showApplyStatus: true,
      showExport: false,
      showColumnHide: false,
      showFilter: true,
      showFilterExport: false,
      showSaveFilter: false,
      showButton: { routerLink: this.URLConstants.ADDNEWROLE, buttonName: 'Add New Role' }
    };
  }
  /*************************************************************/
}
