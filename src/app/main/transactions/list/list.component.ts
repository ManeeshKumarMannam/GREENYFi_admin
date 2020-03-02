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
    this.accessPermission = this.getRolePermissions("transaction");
  }

  ngOnInit() {
    this.setBreadcrumbs();
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
      { localeKey: 'Transactions', url: null },
    ];
    this.subHeaderData = {
      title: 'Transactions',
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
      { type: 'text', colName: 'Transction Id', colFieldname: 'transactionId', columnVisibility: true, isVisible: true, sort: false, },
      { type: 'text', colName: 'E-mail', colFieldname: 'emailId', sort: true, columnVisibility: true, filter: false, isVisible: true },
      { type: 'date', colName: 'Date Of Transaction', colFieldname: 'dateOfTransaction', sort: true, columnVisibility: true, filter: true, isVisible: true },
      { type: 'currency', colName: 'Amount (USD)', colFieldname: 'donationAmount', sort: true, columnVisibility: true, filter: false, isVisible: true },
      { type: 'text', colName: 'Payment Method', colFieldname: 'paymentMethod', sort: true, columnVisibility: true, filter: false, isVisible: true },
      { type: 'type', colName: 'User Type', colFieldname: 'isGuest', columnVisibility: true, sort: true, isVisible: true },
      // { type: 'switch', colName: 'Status', colFieldname: 'status', columnVisibility: true, filter: true },
      { type: 'action', colName: 'Action', colFieldname: '', isVisible: true },
    ];
    // if (!this.accessPermission.viewDetails && !this.accessPermission.delete) {
    //   this.hideActionInTable(tempData);
    // }
    this.tableSetupData.cols = tempData;
    this.tableSetupData.type = 'transctionList';
    this.tableSetupData.actions = [
      { id: 5, buttonTitle: 'View', class: 'fa fa-eye text-primary', type: 'icon', permission: this.accessPermission.viewDetails },
      // { id: 3, buttonTitle: 'delete', class: 'fa fa-trash text-danger', type: 'icon' },
    ];
    if (!this.accessPermission.viewDetails) {
      this.hideActionInTable(tempData);
    }
    this.tableSetupData.params = { deleteParams: 'userIds', statusParams: 'userIds' };
    this.tableSetupData.conditions = {
      showTableHeader: true,
      showTableFooter: true,
      showSearchStatus: true,
      showExport: true,
      showFilter: true,
    };
  }
  /*************************************************************/
}
