import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../common/commonComponent';
import { IBreadcrumbs, ITableSetupData } from '../../../../../common/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent extends BaseComponent implements OnInit {
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  public accessPermission: any;
  constructor(public inj: Injector) {
    super(inj);
    this.setBreadcrumbs();
    this.accessPermission = this.getRolePermissions("faq");
  }

  ngOnInit() {
    this.accessPermission = this.getRolePermissions("cms");
    this.setDTableInitialData();
  }
  /*********************************************************************************
            @PURPOSE      : Set the Sub Header
            @PARAMETERS   : {
                             localKey: string //Heading Name
                              URL: any       
                             }
 /*********************************************************************************/

  tableSetupData: ITableSetupData = { cols: [], actions: null, type: null, params: {}, conditions: {} };
  setBreadcrumbs() {
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Content Management', url: this.URLConstants.HOME },
      { localeKey: 'Contact Us', url: null },
      { localeKey: 'FAQ', url: null },
    ];
    this.subHeaderData = {
      title: 'FAQ',
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
      { type: 'text', colName: 'Question', colFieldname: 'question', sort: true, columnVisibility: true, isVisible: true },
      { type: 'html', colName: 'Answer', colFieldname: 'answer', sort: true, isVisible: true },
      { type: 'action', colName: 'Action', colFieldname: '', isVisible: true },
    ];
    if (!this.accessPermission.edit && !this.accessPermission.delete) {
      this.hideActionInTable(tempData);
    }
    this.tableSetupData.cols = tempData;
    this.tableSetupData.type = 'faqlist';
    this.tableSetupData.actions = [
      { id: 2, buttonTitle: 'Edit', class: 'fa fa-pencil text-primary', type: 'icon', permission: this.accessPermission.edit },
      { id: 3, buttonTitle: 'Delete', class: 'fa fa-trash text-danger', type: 'icon', permission: this.accessPermission.delete },
    ];
    if (!this.accessPermission.edit && !this.accessPermission.delete) {
      this.hideActionInTable(tempData);
    }
    this.tableSetupData.params = { deleteParams: 'faqId' };
    this.tableSetupData.conditions = {
      showTableHeader: true,
      showTableFooter: false,
      showApplyStatus: false,
      showExport: false,
      showColumnHide: false,
      showFilter: false,
      showFilterExport: false,
      showSaveFilter: false,
      showSearchStatus: true,
      showButton: { routerLink: this.URLConstants.ADDFAQ, buttonName: 'Add New FAQ' },
    };
  }
  /*******************************************************************************/

}
