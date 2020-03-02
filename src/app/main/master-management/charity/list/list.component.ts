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
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  constructor(public inj: Injector) {
    super(inj);
    this.accessPermission = this.getRolePermissions("charity");
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.setDTableInitialData();
  }
  /*********************************************************************************
          @PURPOSE      : Set the Sub Header
          @PARAMETERS   : {
                           localKey: string //Heading Name
                            URL: any       
                           }
  /*********************************************************************************/
  setBreadcrumbs() {
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Master Management', url: null },
      { localeKey: 'Charity', url: null },
    ];
    this.subHeaderData = {
      title: 'Charity',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /***************************************************************************************/




  /*****************************************************************************************
                 @PURPOSE      : Set the Datatable config settings
 
                 @PARAMETERS   : {
                                 sort: Boolean            ==>Heading Name
                                 isVisible: Boolean       ==>static column 
                                 columnVisibility:Boolean ==>dynamic changing visibility of columns 
                                 filter:any               ==>filter for that colName
  
                                 }
   /********************************************************************************************/
  setDTableInitialData() {
    const tempData = [
      { type: 'text', colName: 'Name', colFieldname: 'name', filter: true, columnVisibility: true, isVisible: true, sort: true, },
      { type: 'text', colName: 'TAX Id', colFieldname: 'txnId', isVisible: true, columnVisibility: true, sort: true },
      { type: 'switch', colName: 'Status', colFieldname: 'status', columnVisibility: true, filter: true, isVisible: true },
      { type: 'action', colName: 'Action', colFieldname: '', isVisible: true },
    ];
    if (!this.accessPermission.edit) {
      this.hideActionInTable(tempData);
    }
    this.tableSetupData.cols = tempData;
    this.tableSetupData.type = 'charityList';
    this.tableSetupData.actions = [
      { id: 1, buttonTitle: 'Edit', class: 'fa fa-pencil text-primary', type: 'icon', permission: this.accessPermission.edit },
    ];

    this.tableSetupData.params = { deleteParams: 'Ids', statusParams: 'charityId' };
    this.tableSetupData.conditions = {
      showTableHeader: true,
      showTableFooter: true,
      showApplyStatus: false,
      showSearchStatus: true,
      showExport: true,
      showColumnHide: false,
      showFilter: false,
      showFilterExport: true,
      showSaveFilter: true,
      showButton: { routerLink: this.URLConstants.ADD_NEW_CHARITY, buttonName: 'Add New Charity' },
    };
  }
  /************************************************************************************************/
}
