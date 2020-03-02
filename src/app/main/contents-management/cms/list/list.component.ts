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
    this.setBreadcrumbs();
    this.accessPermission = this.getRolePermissions("cms");
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
      { localeKey: 'Content Management', url: this.URLConstants.HOME },
      { localeKey: 'CMS', url: null },
    ];
    this.subHeaderData = {
      title: 'CMS',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /******************************************************************************/

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
      { type: 'text', colName: 'pageTitle', colFieldname: 'pageTitle', columnVisibility: true, isVisible: true },
      { type: 'html', colName: 'Description', colFieldname: 'gjsHtml', isVisible: true },
      { type: 'action', colName: 'Action', colFieldname: '', isVisible: true },
    ];
    if (!this.accessPermission.edit) {
      this.hideActionInTable(tempData);
    }
    this.tableSetupData.cols = tempData;
    this.tableSetupData.type = 'cmslist';
    // if (!this.accessPermission.edit && !this.accessPermission.delete) {
    //   this.hideActionInTable(tempData);
    // }
    this.tableSetupData.actions = [
      { id: 2, buttonTitle: 'Edit', class: 'fa fa-pencil text-primary', type: 'icon', permission: this.accessPermission.edit },
      // { id: 3, buttonTitle: 'Delete', class: 'fa fa-trash text-danger', type: 'icon', permission: this.accessPermission.delete },
    ];
    this.tableSetupData.params = { deleteParams: 'ids' };
    this.tableSetupData.conditions = {
      showTableHeader: true,
      showTableFooter: false,
      showApplyStatus: false,
      showExport: false,
      showColumnHide: false,
      showFilter: false,
      showFilterExport: false,
      showSaveFilter: false,
      // showButton: { routerLink: this.URLConstants.ADD_NEW_CMS, buttonName: 'Add New CMS' },
    };
  }
  /********************************************************************************/
}
