import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../common/commonComponent';
import { IBreadcrumbs, ITableSetupData } from '../../../../../common/interfaces';

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
    this.accessPermission = this.getRolePermissions("inquiry");

  }

  ngOnInit() {
    this.setDTableInitialData()
  }
  /*********************************************************************************
             @PURPOSE      : Set the Sub Header
             @PARAMETERS   : {
                              localKey: string //Heading Name
                               URL: any       
                              }
  /*********************************************************************************/
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  setBreadcrumbs() {
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Content Management', url: this.URLConstants.HOME },
      { localeKey: 'Contact Us', url: this.URLConstants.FAQ },
      { localeKey: 'Inquiry', url: null },
    ];
    this.subHeaderData = {
      title: 'Inquiry',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*********************************************************************************/


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
      { type: 'text', colName: 'Email-ID', colFieldname: 'emailId', sort: true, columnVisibility: true, isVisible: true },
      { type: 'message', colName: 'Message', colFieldname: 'message', isVisible: true },
      { type: 'switch', colName: 'Status', colFieldname: 'statusField', columnVisibility: true, filter: true, isVisible: true },
      { type: 'action', colName: 'Action', colFieldname: '', isVisible: true },
    ];
    if (!this.accessPermission.viewDetails) {
      this.hideActionInTable(tempData);
    }
    this.tableSetupData.cols = tempData;
    this.tableSetupData.type = 'Inquirylist';
    this.tableSetupData.actions = [
      { id: 1, buttonTitle: 'View', class: 'fa fa-eye text-primary', type: 'icon', permission: this.accessPermission.viewDetails },
      // { id: 3, buttonTitle: 'Delete', class: 'fa fa-trash text-danger', type: 'icon' },
    ];

    this.tableSetupData.params = { deleteParams: 'enquiryId', statusParams: 'enquiryIds' };
    this.tableSetupData.conditions = {
      showTableHeader: true,
      showTableFooter: true,
      showApplyStatus: false,
      showExport: false,
      showColumnHide: false,
      showFilter: false,
      showFilterExport: false,
      showSaveFilter: false,
      showSearchStatus: true,
      // showButton: { routerLink: this.URLConstants.ADDENQUIRY, buttonName: 'Add New Enquiry' },
    };
  }
}
