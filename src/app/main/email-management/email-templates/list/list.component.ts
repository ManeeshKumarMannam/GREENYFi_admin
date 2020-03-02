import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../common/commonComponent';
import { IBreadcrumbs, ITableSetupData } from '../../../../common/interfaces';

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
    this.accessPermission = this.getRolePermissions('EmailTemplate');
    // END: Role Permission //
  }

  ngOnInit() {
    this.setDTableInitialData();
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
      { localeKey: 'Email Management', url: this.URLConstants.ADMIN_EMAIL },
      { localeKey: 'E-mail Templates', url: null },
    ];
    this.subHeaderData = {
      title: 'E-mail Templates',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/

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
      { type: 'text', colName: 'Template Title', colFieldname: 'emailKey', sort: true, columnVisibility: true, filter: true },
      { type: 'text', colName: 'Subject', colFieldname: 'subject', sort: true, columnVisibility: true, filter: true },
      { type: 'switch', colName: 'Status', colFieldname: 'status', columnVisibility: true, filter: true },
      { type: 'action', colName: 'Action', colFieldname: '', isVisible: true },
    ];

    this.tableSetupData.cols = tempData;
    this.tableSetupData.type = 'emailTemplateList';
    this.tableSetupData.actions = [
      { id: 2, buttonTitle: 'Edit', class: 'fa fa-pencil text-primary', type: 'icon', permission: this.accessPermission.edit },
      // { id: 3, buttonTitle: 'delete', class: 'fa fa-trash text-danger', type: 'icon', permission: this.accessPermission.delete },
    ];
    // && !this.accessPermission.delete
    if (!this.accessPermission.edit) {
      this.hideActionInTable(tempData);
    }
    this.tableSetupData.params = { deleteParams: 'ids', statusParams: 'ids' };
    this.tableSetupData.conditions = {
      showTableHeader: true,
      showTableFooter: true,
      showApplyStatus: true,
      showExport: false,
      showColumnHide: true,
      showFilter: true,
      showFilterExport: false,
      showSaveFilter: false,
      // showButton: { routerLink: this.URLConstants.EMAIL_TEMPLATE_detail, buttonName: 'Add Email Template' },
    };
  }
  /*************************************************************/
}
