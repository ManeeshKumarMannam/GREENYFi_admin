import { AfterViewInit, Component, Injector, Input, OnInit, TemplateRef } from '@angular/core';
import { yearsPerPage } from '@angular/material/datepicker/typings/multi-year-view';
import { BaseComponent } from '../../common/commonComponent';
import { ITableSetupData } from './../../common/interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styles: [],
})
export class DataTableComponent extends BaseComponent implements OnInit, AfterViewInit {
  public initialPagination: any;
  public itemsPerPage = 10;
  public getMethodName: any;
  submitted = false;
  public total: any;
  public type: any;
  @Input() tableSetupData: ITableSetupData;
  // tslint:disable-next-line: no-input-rename
  @Input() data;

  public tempData: any = [];
  public tableConfig: any;
  // public tableData : any;
  // public data : any;
  tableData = {
    cols: ['id', 'author', 'title'],
    data: this.tempData,
    rowSelected: 0,
    value: false,
    type: '',
  };

  constructor(inj: Injector) {
    super(inj);
    this.initialPagination = { page: 1, pagesize: 10 };
  }

  ngOnInit() {
    // console.log("this.tableConfig=======", this.tableSetupData);
    this.tableConfig = this.tableSetupData;
    this.type = this.tableConfig.type;
  }
  ngAfterViewInit() {
    this.callApiToGetData();
  }
  public userId: any;

  callApiToGetData() {

    if (this.type) {
      if (this.type === 'userlist') {
        this.getMethodName = this.callAPIConstants.UserList;
      } else if (this.type === 'cmslist') {
        this.getMethodName = 'admin/getCms';
      } else if (this.type === 'scorelist') {
        this.getMethodName = 'admin/getAdminScoreListing';
      }

      this.commonService.callApi(this.getMethodName, this.initialPagination, 'post', false, false).then((success) => {
        // console.log("success", success);

        if (success.status === 1) {
          this.tableData.data = success.data;
          this.total = success.total;
        }
      });
    }

  }

  public sortDirection: any;
  public sortField = {};
  onSorted(event, type) {
    this.initialPagination.sort = {};
    if (event.sortDirection === 'desc') {
      this.sortDirection = -1;
    } else {
      this.sortDirection = 1;
    }
    this.initialPagination.sort[event.sortColumn.colFieldname] = this.sortDirection;
    // this.callApiToGetData()

  }
  // *************************************************************//

  /***************************************************************/
  // Pagination for user listing //
  /***************************************************************/
  public currentPage = 1;
  public showBoundaryLinks = false;
  public rangeList = [2, 5, 10, 25, 100];
  // public : any;

  pageChanged(e) {

    this.initialPagination.page = e.page;
    this.itemsPerPage = e.itemsPerPage;
    this.callApiToGetData(); // write the method name here to get new data on page change from backend
  }
  rangeChanged(e) {

    this.initialPagination.pagesize = e;
    this.initialPagination.page = 1;
    this.callApiToGetData(); // write the method name here to get new data on range change from backend
  }
  /***************************************************************/

  /*************************************************************/
  // User Status
  /*************************************************************/
  public message: any;
  userStatus(k, rowData) {
    this.message = rowData.isBlocked ? 'Are you sure you want to block this user?' : 'Are you sure you want to unblock this user?';
    const data = {
      userId: rowData._id,
      status: rowData.isBlocked ? 'no' : 'yes',
    };
    this.swal({
      text: this.message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-outline-primary',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      showLoaderOnConfirm: true,
      buttonsStyling: false,
      // admin​/updateUserBlockStatus
    }).then((result) => {
      if (result.value) {
        this.commonService
          .callApi(
            'admin/updateUserBlockStatus', data, 'post', false, false)
          .then((success) => {
            if (success.settings.status === 1) {
              this.popToast('success', success.settings.message);
              this.callApiToGetData();
            } else {
              this.popToast('error', success.settings.message);
            }
          });
      }
    });
  }
  premiumAmount(amount) {
    this.submitted = true;
  }

  performAction(k, i) {
    // view action
    if (k.id === 2) {
    }
  }
}
