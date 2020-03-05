import { AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    this.accessPermission = this.getRolePermissions("user");
    if(!this.accessPermission) {
      this.accessPermission = {};
    }
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.setDTableInitialData();
  }

  /**********************************************************************************
          @PURPOSE      : Set the Sub Header
          @PARAMETERS   : {
                           localKey: string //Heading Name
                            URL: any       
                           }
  /***********************************************************************************/
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  setBreadcrumbs() {
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Reported Issues', url: null },
    ];
    this.subHeaderData = {
      title: 'Reported Issues List',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /****************************************************************************************/



  /*******************************************************************************************
              @PURPOSE      : Set the Datatable config settings

              @PARAMETERS   : {
                              sort: Boolean            ==>Heading Name
                              isVisible: Boolean       ==>static column 
                              columnVisibility:Boolean ==>dynamic changing visibility of columns 
                              filter:any               ==>filter for that colName
 
                              }
/*****************************************************************************************/

  setDTableInitialData() {
    const tempData = [
      // { type: 'multipleSelection', colName: 'Select', colFieldname: '', isVisible: false },
      // { type: 'text', colName: 'First Name', colFieldname: 'firstname', sort: true, columnVisibility: true, filter: true, isVisible: true },
      { type: 'image', colName: 'Images', colFieldname: 'images', sort: false, columnVisibility: true, filter: true, isVisible: true },
      { type: 'text', colName: 'City', colFieldname: 'city', sort: false, columnVisibility: true, filter: true, isVisible: true },
      { type: 'text', colName: 'Area', colFieldname: 'area', sort: false, columnVisibility: true, filter: true, isVisible: true },
      { type: 'text', colName: 'Location', colFieldname: 'location', sort: false, columnVisibility: true, filter: true, isVisible: true },
      { type: 'switch', colName: 'Status', colFieldname: 'status', columnVisibility: true, isVisible: true },
      { type: 'action', colName: 'Action', colFieldname: '', isVisible: true },
    ];
    if (this.accessPermission && !this.accessPermission.edit) {
      this.hideActionInTable(tempData);
    }
    // if (this.accessPermission && this.accessPermission.viewDetails) {
    //   this.hideActionInTable(tempData);
    // }
    this.tableSetupData.cols = tempData;
    this.tableSetupData.type = 'reportedIssuesList';
    this.tableSetupData.actions = [
      { id: 1, buttonTitle: 'View', class: 'fa fa-eye text-primary', type: 'icon', permission: this.accessPermission.viewDetails },
      { id : 2, buttonTitle : "Assign Volunteer", class: 'btn btn-primary', type :'button'}
    ];
    this.tableSetupData.params = { deleteParams: 'userIds', statusParams: 'userIds' };
    this.tableSetupData.conditions = {
      showTableHeader: false,
      showTableFooter: true,
      showApplyStatus: true,
      showExport: true,
      showColumnHide: true,
      showFilter: true,
      showFilterExport: true,
      showSaveFilter: true,
    };
  }
  /*******************************************************************************************/
}
