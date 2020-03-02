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
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.setDTableInitialData();
    this.accessPermission = this.getRolePermissions("user");

  }
  /****************************************************************************
          @PURPOSE      : Set the Sub Header
          @PARAMETERS   : {
                           localKey: string //Heading Name
                            URL: any       
                           }
  /*******************************************************************************/
  setBreadcrumbs() {
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Users Management', url: this.URLConstants.USERS },
      { localeKey: 'Guest Users', url: null },
    ];
    this.subHeaderData = {
      title: 'Guest Users',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /**********************************************************************************/



  /************************************************************************************
               @PURPOSE      : Set the Datatable config settings

               @PARAMETERS   : {
                               sort: Boolean            ==>Heading Name
                               isVisible: Boolean       ==>static column 
                               columnVisibility:Boolean ==>dynamic changing visibility of columns 
                               filter:any               ==>filter for that colName
 
                               }
 /***************************************************************************************/

  setDTableInitialData() {
    const tempData = [
      // { type: 'image', colName: 'Profile Image', colFieldname: 'photo', columnVisibility: false, isVisible: true },
      { type: 'text', colName: 'Name', colFieldname: 'firstname', sort: true, columnVisibility: true, filter: true, isVisible: true },
      // { type: 'text', colName: 'Last Name', colFieldname: 'lastname', sort: true, columnVisibility: false, filter: true },
      { type: 'text', colName: 'E-mail', colFieldname: 'emailId', sort: true, columnVisibility: true, filter: true, isVisible: true },
      { type: 'text', colName: 'Phone Number', colFieldname: 'phone', sort: true, columnVisibility: true, filter: true, isVisible: true },
    ];
    this.tableSetupData.cols = tempData;
    this.tableSetupData.type = 'guestlist';
    this.tableSetupData.params = { deleteParams: 'userIds', statusParams: 'userIds' };
    this.tableSetupData.conditions = {
      showTableHeader: true,
      showTableFooter: true,
      showApplyStatus: false,
      showExport: true,
      showColumnHide: true,
      showFilter: true,
      showFilterExport: true,
      showSaveFilter: true,
    };
  }
  /*******************************************************************************************/
}
