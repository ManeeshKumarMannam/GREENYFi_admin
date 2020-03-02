import { AfterViewInit, Component, Injector, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import Responsive from 'datatables.net-responsive';
import { BaseComponent } from '../../common/commonComponent';
import { ITableSetupData } from './../../common/interfaces';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, mergeMap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-responsive-data-table',
  templateUrl: './responsive-data-table.component.html',
  styles: [],
})
export class ResponsiveDataTableComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  dtOptions: any = {};
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  @ViewChild('custompagination') custompagination;
  dtElement: any = {};
  public daterangepickerModel: Date[];
  APIparameters: any = {};
  total: any;
  public type: any;
  public submitted = false;
  public date = new Date();
  public selectedUserList: any[] = [];
  public columnVisibilityOptions = false;
  public filterColumnOption = false;
  public params: any;
  public conditions: any;
  public method: any;
  @Input() accessPermission: any;
  @Input() tableSetupData: ITableSetupData;
  public tempData: any = [];
  public tableConfig: any;
  public MainSearchdataSource: Observable<any>;
  public setFocus: boolean = true;
  public methodName: any;
  tableData = {
    cols: ['id', 'author', 'title'],
    data: [],
    rowSelected: 0,
    value: false,
    type: '',
  };

  constructor(inj: Injector) {
    super(inj);
    this.APIparameters = {
      page: 1, pagesize: 10
    };


  }

  ngOnInit() {
    this.tableConfig = this.tableSetupData;
    this.type = this.tableConfig.type;
    this.params = this.tableConfig.params;
    this.conditions = this.tableConfig.conditions;
    /*************************************************************/
    // Change statusList according to role Permission
    /*************************************************************/

    this.statusList = ['Active', 'Inactive'];
    if (!this.accessPermission.statusUpdate) {
      this.conditions.showApplyStatus = false;
      const index = this.tableConfig.cols.findIndex((o) => o.type === 'multipleSelection');
      if (this.tableConfig.cols[index]) { this.tableConfig.cols[index].isVisible = false; }
    }
    /*************************************************************/
  }

  ngAfterViewInit() {
    this.callApiToGetData();
    // options for datatable
    this.dtOptions = {
      destroy: true,
      retrieve: true,
      searching: false,
      sorting: false,
      ordering: false,
      autoWidth: false,
      paging: false,
      info: false,
      responsive: {
        details: {
          renderer: Responsive.renderer.listHiddenNodes(),
        },
      },
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 },
      ],
    };
  }

  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  /*************************************************************/
  // Api for List
  /*************************************************************/
  public getMethodName: any;
  public CSV: any;
  public EXCEL: any;
  public DeleteUser: any;
  public ChangeStatus: any;
  public getFilterlist: any;
  public colVisible: any;
  public saveFilter: any;
  public getFilter: any;
  public deleteFilter: any;
  /*************************************************************************
       @PURPOSE      : To get the API names and and Listing
       @PARAMETERS   : {
                       type: string
                      }
       @Return        : Array of objetcs    
   /*************************************************************************/
  public cssData = [];
  callApiToGetData() {
    if (this.type) {


      if (this.type === 'userlist') {
        this.getMethodName = this.callAPIConstants.UserList;
        this.CSV = this.callAPIConstants.UserCSVforDataTable;
        this.DeleteUser = this.callAPIConstants.UserDeleteUsers;
        this.ChangeStatus = this.callAPIConstants.UserChangeStatus;
        this.colVisible = this.callAPIConstants.UserColumnVisibleSettings;
        this.getFilterlist = this.callAPIConstants.UserGetColumnData;
        this.saveFilter = this.callAPIConstants.UserSaveFilter;
        this.getFilter = this.callAPIConstants.UserGetFilters;
        this.deleteFilter = this.callAPIConstants.UserDeleteFilter;
      } else if (this.type === 'adminUserlist') {
        this.getMethodName = this.callAPIConstants.AdminUserlist;
        this.CSV = this.callAPIConstants.AdminCSVforDataTable;
        this.DeleteUser = this.callAPIConstants.AdminDeleteUsers;
        this.ChangeStatus = this.callAPIConstants.AdminChangeStatus;
        this.colVisible = this.callAPIConstants.AdminColumnVisibleSettings;
        this.getFilterlist = this.callAPIConstants.AdminGetColumnData;
        this.saveFilter = this.callAPIConstants.AdminSaveFilter;
        this.getFilter = this.callAPIConstants.AdminGetFilters;
        this.deleteFilter = this.callAPIConstants.AdminDeleteFilter;
      } else if (this.type === 'emailTemplateList') {
        this.getMethodName = this.callAPIConstants.EmailTemplateList;
        this.getFilterlist = this.callAPIConstants.EmialColumnData;
        this.colVisible = this.callAPIConstants.EmialColumnVisibleSettings;
        this.DeleteUser = this.callAPIConstants.DeleteEmailTemplate;
        this.ChangeStatus = this.callAPIConstants.EmailChangeStatus;
      } else if (this.type === 'cmslist') {
        this.getMethodName = this.callAPIConstants.cmsList;
        this.DeleteUser = this.callAPIConstants.cmsDelete;
      } else if (this.type === 'roleList') {
        this.getMethodName = this.callAPIConstants.RoleList;
        this.ChangeStatus = this.callAPIConstants.RoleChangeStatus;
        this.getFilterlist = this.callAPIConstants.RoleGetColumnData;
      }
      else if (this.type === 'homeList') {
        this.getMethodName = this.callAPIConstants.homeList;

      }
      else if (this.type === 'charityList') {
        this.getMethodName = this.callAPIConstants.charityList;
        this.colVisible = this.callAPIConstants.charityColumnVisibleSettings;
        this.ChangeStatus = this.callAPIConstants.CharityChangeStatus;
        this.CSV = this.callAPIConstants.charityCSVforDataTable;
      }
      else if (this.type === 'causesList') {
        this.getMethodName = this.callAPIConstants.causesListing;
        this.ChangeStatus = this.callAPIConstants.UserChangeStatus;
        this.ChangeStatus = this.callAPIConstants.CauseChangeStatus;
        this.CSV = this.callAPIConstants.causeCSVforDataTable;

      }
      else if (this.type === 'guestlist') {
        this.getMethodName = this.callAPIConstants.guestListing;
        this.CSV = this.callAPIConstants.guestCSVforDataTable;
        this.getFilter = this.callAPIConstants.GuestGetFilters;
        this.getFilterlist = this.callAPIConstants.guestUserGetColumnValues;
        this.saveFilter = this.callAPIConstants.GuestUserSaveFilter;
        this.deleteFilter = this.callAPIConstants.GuestUserDeleteFilter;

      }
      else if (this.type === 'faqlist') {
        this.getMethodName = this.callAPIConstants.faqList;
        this.DeleteUser = this.callAPIConstants.faqDelete;
      }
      else if (this.type === 'Inquirylist') {
        this.getMethodName = this.callAPIConstants.inquiryList;
        this.DeleteUser = this.callAPIConstants.inquiryDelete;
        this.ChangeStatus = this.callAPIConstants.EnauiryChangeStatus;

      }
      else if (this.type == 'transctionList') {
        this.getMethodName = this.callAPIConstants.transctionList;
        this.CSV = this.callAPIConstants.TransactionsCSVforDataTable;
      }
      if (this.getMethodName) {
        this.commonService.callApi(this.getMethodName, this.APIparameters, 'post', false, false).then((success) => {
          if (success.status === 1) {
            if (this.type === 'Inquirylist') {
              this.tableData.data = success.data.listing;

              this.tableData.data.forEach((element) => {
                element.statusField = (element.status == 'open') ? true : false
              })
            }
            else {
              this.tableData.data = success.data.listing;
              this.tableConfig.cols.forEach((element) => {
                if (success.data.columnSettings) {
                  success.data.columnSettings.forEach((dataApi) => {
                    if (element.colFieldname === dataApi.key) {
                      element.isVisible = dataApi.status;
                    }
                  });
                }
              });
              if (!this.accessPermission.statusUpdate) {
                const index = this.tableConfig.cols.findIndex((o) => o.type === 'switch');
                if (this.tableConfig.cols[index]) {
                  this.tableConfig.cols[index].isVisible = false;
                  this.tableConfig.cols[index].filter = false;
                  if (this.tableConfig.cols[index].columnVisibility) { this.tableConfig.cols[index].columnVisibility = false; }
                }
              }
            }



            if (this.type == 'cmslist') {
              this.cssData = [];
              this.tableData.data.forEach(x => {
                if (x.gjsHtml) {
                  x.gjsHtml = x.gjsHtml.slice(0, 500)
                }
                if (x.gjsCss) {
                  // this.cssData.push(x.gjsCss)
                  $("style").append(x.gjsCss);
                }
              })
            }
            if (!this.accessPermission.statusUpdate) {
              const index = this.tableConfig.cols.findIndex((o) => o.type === 'switch');
              if (this.tableConfig.cols[index]) {
                this.tableConfig.cols[index].isVisible = false;
                this.tableConfig.cols[index].filter = false;
                if (this.tableConfig.cols[index].columnVisibility) { this.tableConfig.cols[index].columnVisibility = false; }
              }
            }
            this.total = success.total;
            this.rerenderDataTable();
          } else {
            this.popToast('error', 'Something Went Wrong!');
          }
        });
      }
    }
  }


  // *************************************************************//

  /*************************************************************************
       @PURPOSE      :Delete the users
       @PARAMETERS   : {
                       data: object
                      }
   /*************************************************************************/
  CallAPIchangeStatusORDelete(callAPI, data) {


    if (data.charityId || data.causeId) {
      this.methodName = 'put'
    } else {
      this.methodName = 'post'
    }


    this.commonService.callApi(callAPI, data, this.methodName, false, false).then((success) => {
      if (success.status === 1) {
        this.popToast('success', success.message);
        this.selectedUserList = [];
        setTimeout(() => {
          this.callApiToGetData();
        });
      } else {
        this.popToast('error', 'Something Went Wrong!');
      }
    });
  }
  // *************************************************************//


  /*************************************************************************
      @PURPOSE      :Api for downloading CSV or Excel file of datatable( with and without filter )
      @PARAMETERS   : {
                      isFilter: boolean
                     }
  /*************************************************************************/

  public download = {};
  public isFilter: boolean;
  CallAPIdownloadCSVandExcel(data, isFilter) {

    let downloadArr: any[] = [];
    this.tableConfig.cols.forEach((element) => {
      if (element.columnVisibility && element.isVisible) {
        downloadArr.push(element.colFieldname);
      }
    });
    if (this.type !== 'charityList' && this.type !== 'causesList') {
      isFilter ?
        this.download = {
          columns: downloadArr,
          filter: this.filter,
        }
        :
        this.download = {
          columns: downloadArr,
        };
    }
    if (this.type === 'charityList') {
      downloadArr = ['txnId', 'name', 'subDescription', 'gjsHtml', 'webSite', 'causes', 'rating'];
      this.download = {
        columns: downloadArr,
      };
    }
    if (this.type === 'causesList') {
      downloadArr = ['reasonToDonate', 'name', 'subTitle', 'subDescription', 'subTitleDescription', 'gjsHtml', 'charities'];
      this.download = {
        columns: downloadArr,
      };
    }


    data === 'csv' ?
      this.commonService.callApi(this.CSV, this.download, 'post', false, false).then((success) => {
        window.open(success.data, '_blank');
      })
      :
      this.commonService.callApi(this.EXCEL, this.download, 'post', false, false).then((success) => {
        window.open(success.data, '_blank');
      });
  }
  // *************************************************************//



  /*************************************************************************
      @PURPOSE      : select users and change status
      @PARAMETERS   : {
                      data: any //users data
                      index:any
                     }
  /*************************************************************************/

  public statusFormData = { status: '' };
  public statusList: any[];

  selectMultipleUser(data, index) {
    if (data.checkbox) {
      this.selectedUserList.push(data._id)
    } else {
      this.tableData.data[index].checkbox = false;
      let x = this.selectedUserList.findIndex(o => o == data._id);
      this.selectedUserList.splice(x, 1);
    }
  }
  /*************************************************************************/




  /*************************************************************************
     @PURPOSE      : submit Status Form
     @PARAMETERS   : {
                     statusForm: any // whole form data
                     statusFormData:any //users data
                    }
  /*************************************************************************/

  submitStatusForm(statusForm, statusFormData) {
    this.submitted = true;
    if (statusForm.valid && this.selectedUserList.length) {
      // DELETE
      if (statusFormData.status === 'Delete') {

        this.confirmpopToast('warning', 'Do you want to delete??').then((result) => {
          if (result.value === true) {
            const data = { [this.params.deleteParams]: this.selectedUserList };
            this.CallAPIchangeStatusORDelete(this.DeleteUser, data);
          } else {
            const index = this.tableConfig.cols.findIndex((o) => o.type === 'multipleSelection');
            this.tableConfig.cols[index].checkbox = false;
            this.deselectMultipleUser();
          }
        });
      }
      // DELETE
      // STATUS
      if (statusFormData.status === 'Inactive' || statusFormData.status === 'Active') {
        let data;
        statusFormData.status === 'Inactive' ?
          data = { [this.params.statusParams]: this.selectedUserList, status: false } :
          data = { [this.params.statusParams]: this.selectedUserList, status: true };
        this.CallAPIchangeStatusORDelete(this.ChangeStatus, data);
        const index = this.tableConfig.cols.findIndex((o) => o.type === 'multipleSelection');
        this.tableConfig.cols[index].checkbox = false;
      }

    } else {

      this.type === 'roleList' ? this.popToast('error', 'Select Role To Modify') : this.type == 'emailTemplateList' ? this.popToast('error', 'Select Email Template To Modify') : this.popToast('error', 'Select Users To Modify');



    }
    statusForm.reset();
  }

  /*************************************************************************
     @PURPOSE      : Rerendering Datatable
     @PARAMETERS   : {
                    
                    }
  /*************************************************************************/


  rerenderDataTable() {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        // if(this.tableData.data.length || this.APIparameters.filter||
        //    this.APIparameters.searchTerm){
        //   dtInstance.destroy();
        // }
        dtInstance.destroy();

        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } else { this.dtTrigger.next(); }
  }
  // *************************************************************//



  /*************************************************************************
     @PURPOSE      : Sorting for  listing
     @PARAMETERS   : {
                     event :any 
                    }
  /*************************************************************************/
  onSorted(event) {

    if (this.type == 'charityList' || this.type == 'causesList' || this.type == 'homeList' || this.type == 'faqlist' || this.type == 'faqlist' || this.type == 'Inquirylist' || this.type == 'transctionList'
    ) {
      this.APIparameters.sortOrder = {}
      event.sortDirection === 'desc' ? event.sortDirection = 'desc' : event.sortDirection = "asc";
      this.APIparameters.sortParams = event.sortColumn.colFieldname;
      this.APIparameters.sortOrder = event.sortDirection;
      this.callApiToGetData();
    }

    else {
      this.APIparameters.sort = {};
      event.sortDirection === 'desc' ? event.sortDirection = -1 : event.sortDirection = 1;
      this.APIparameters.sort[event.sortColumn.colFieldname] = event.sortDirection;
      this.callApiToGetData();
    }
  }
  // *************************************************************//



  /*************************************************************************
     @PURPOSE      : Pagination
     @PARAMETERS   : {
                     event :any 
                    }
 /*************************************************************************/

  public itemsPerPageList = [5, 10, 25, 100];
  itemsPerPage = 10;

  pagination(e) {
    this.tableConfig.cols.forEach(element => {
      element.type == 'multipleSelection' ? element.checkbox = false : '';
    });
    this.APIparameters.page = e.page;
    this.itemsPerPage = e.itemsPerPage;
    this.callApiToGetData();
    setTimeout(() => {
      if (this.selectedUserList.length) {
        this.selectedUserList.forEach((element) => {
          const x = this.tableData.data.findIndex((o) => element === o._id);
          if (x > -1) {
            this.tableData.data[x].checkbox = true;
          }
        });
      }
    }, 500);
  }

  selectItemPerPage(e) {
    this.tableConfig.cols.forEach(element => {
      element.type == 'multipleSelection' ? element.checkbox = false : ''
    });
    this.APIparameters.pagesize = e;
    this.APIparameters.page = 1;
    this.custompagination._page = 1;
    this.callApiToGetData();
  }

  /*************************************************************************
    @PURPOSE      : Perform Action: VIEW, EDIT, DELETE And SWITCH 
    @PARAMETERS   : {
                    k :any
                    id:any //users id 
                   }
  /*************************************************************************/

  performAction(k, i) {


    if (this.type === 'charityList') {
      this.router.navigate([this.URLConstants.CHARITY_DETAIL, i._id]);
    }
    else if (this.type == 'transctionList' && k.id == 5) {
      this.router.navigate([this.URLConstants.TRANSACTIONSDETAIL, i._id]);
    }
    else if (this.type === 'faqlist' && k.id === 2) {
      this.router.navigate([this.URLConstants.FAQ_DETAIL, i._id]);
    }
    else if (this.type === 'causesList') {
      this.router.navigate([this.URLConstants.CAUSE_DETAIL, i._id]);
    }
    else if (k.id === 1 && this.type == 'Inquirylist') {
      this.router.navigate([this.URLConstants.INQUERY_DETAIL, i._id]);
    }
    // VIEW action
    else if (k.id === 1 && this.type == 'userlist') {


      this.router.navigate([this.URLConstants.USERS, i._id]);
    } else if (k.id === 2) {
      if (this.type === 'adminUserlist') {
        this.router.navigate([this.URLConstants.ADMINUSER_DETAIL, i._id]);

      } else if (this.type === 'emailTemplateList') {
        this.router.navigate([this.URLConstants.EMAIL_TEMPLATE_detail, i._id]);
      } else if (this.type === 'cmslist') {
        this.router.navigate([this.URLConstants.CMS_DETAIL, i._id]);
      } else if (this.type === 'roleList') {
        this.router.navigate([this.URLConstants.MANAGE_ROLES_DETAIL, i._id]);
      }
      else if (this.type === 'homeList') {
        this.router.navigate([this.URLConstants.HOME_DETAIL, i._id]);
      }

    } else if (k.id === 3) {
      this.confirmpopToast('warning', 'Do you want to delete??').then((result) => {
        if (result.value === true) {
          const dataObj = {
            [this.params.deleteParams]: [i._id],
          };
          this.CallAPIchangeStatusORDelete(this.DeleteUser, dataObj);
        }
      });
    }
  }


  /*************************************************************************
    @PURPOSE      :SWITCH action
    @PARAMETERS   : {
                    d :any
                   }
  /*************************************************************************/

  changeStatus(d) {

    setTimeout(() => {
      if (this.type === 'Inquirylist') {
        d.status = d.status == 'closed' ? 'open' : 'closed';
        var dataObj = {
          [this.params.statusParams]: [d._id],
          status: d.status,
        };
      }
      else {
        dataObj = {
          [this.params.statusParams]: [d._id],
          status: d.status,
        };
      }
      this.CallAPIchangeStatusORDelete(this.ChangeStatus, dataObj);
    });
  }
  /***************************************************************/


  /*************************************************************************
   @PURPOSE      :change visibility of columns
   @PARAMETERS   : {
                   d :any
                  }
/*************************************************************************/

  public columnVisibleArr: any[] = [];
  public fromDate: any;
  public toDate: any;
  tooglecolumnVisibilityFilter() {

    this.columnVisibilityOptions = !this.columnVisibilityOptions;
    this.filterColumnOption = false;
  }

  CallAPIchangeColumnVisibility(tableConfigCols) {


    tableConfigCols.forEach((element) => {
      if (element.columnVisibility) {
        const data = { key: element.colFieldname, status: element.isVisible };
        this.columnVisibleArr.push(data);
      }
    });
    const data = { columns: this.columnVisibleArr };
    this.commonService.callApi(this.colVisible, data, 'post', false, false).then((success) => {
      success.status === 1 ? this.popToast('success', 'Updated Successfully') : this.popToast('error', success.message);
    });
    this.columnVisibleArr = [];
    this.callApiToGetData();
  }

  selectAllColumnVisible() {
    this.tableConfig.cols.forEach((element) => {
      element.isVisible = true;
    });
  }

  resetColumnVisible() {
    this.callApiToGetData();
  }
  /***************************************************************/




  /*************************************************************************
   @PURPOSE      :filter
   @PARAMETERS   : {
                   d :any
                  }
  /*************************************************************************/

  filterlist: any[] = [];
  public filter = [];

  toggleFilterColumn() {
    this.filterColumnOption = !this.filterColumnOption;
    this.columnVisibilityOptions = false;
    if (this.filterColumnOption)
      this.CallAPIgetSavedFilter();
  }

  getFilterlistData(colName, date?) {
    this.filterlist = [];
    const data = {
      page: this.APIparameters.page,
      pagesize: this.APIparameters.pagesize,
      column: colName,
    };
    if (colName == "Date Of Transaction" && date) {

      this.CallAPIgetDateFileter(this.callAPIConstants.transctionList, date)
    }
    else if (colName === 'status') {
      this.filterlist = ['Active', 'Inactive'];
    } else if (colName === 'role') {
      this.CallAPIgetFilterList(this.callAPIConstants.RoleGetColumnData, data);
    }
    else {
      this.CallAPIgetFilterList(this.getFilterlist, data);
    }
  }
  CallAPIgetDateFileter(method, date) {
    let data = {
      fromDate: date[0],
      toDate: date[1]
    }
    this.commonService.callApi(method, data, 'post', false, false).then((success) => {
      if (success.status === 1) {
        this.filterlist = success.data.listing;
      }
    });
  }
  CallAPIgetFilterList(method, data) {

    this.commonService.callApi(method, data, 'post', false, false).then((success) => {
      if (success.status === 1) {
        this.filterlist = success.data.listing;
      }
    });
  }

  selectFilter(fieldName, event) {
    if (fieldName === 'status') {
      if (event == 'Active') {
        this.modifyFilterArr(fieldName, [true]);
      } else if (event == 'Inactive') {
        this.modifyFilterArr(fieldName, [false]);
      } else {
        this.modifyFilterArr(fieldName, [true, false]);
      }
    } else {
      this.modifyFilterArr(fieldName, event);
    }
    // console.log("this.filter", this.filter);
  }




  /*************************************************************************
   @PURPOSE      :to apply the filter data
   @PARAMETERS   : {
                   d :any
                  }
  /*************************************************************************/
  applyFilter() {

    if (this.daterangepickerModel) {
      this.APIparameters.fromDate = this.daterangepickerModel[0];
      this.APIparameters.toDate = this.daterangepickerModel[1];
      this.callApiToGetData();
    }
    else {
      (this.filter.length) ?
        (this.APIparameters.filter = this.filter, this.callApiToGetData()) : (this.popToast('error', 'Please select atleast one field'));
    }
  }

  resetFilter() {

    this.tableConfig.cols.forEach((element) => {
      element.value = [];
    });
    this.filter = [];
    this.APIparameters.filter = [];
    delete this.APIparameters.fromDate;
    delete this.APIparameters.toDate;
    delete this.daterangepickerModel
    this.submitted = false;

    this.callApiToGetData();
  }

  /***************************************************************/





  /*************************************************************************
   @PURPOSE      :SAVE and DELETE FILTER
   @PARAMETERS   : {
                   d :any
                  }
  /*************************************************************************/


  openSaveFilterModal(saveFilters: TemplateRef<any>) {
    this.BsModalRef = this.modalService.show(saveFilters);
  }

  public filterToSave = {};

  submitSaveFilter(saveFilterForm, filterToSave) {
    this.tableConfig.cols.forEach((element) => {
      element.value = [];
    });
    this.submitted = true;
    if (saveFilterForm.valid && this.filter) {
      const filter = {
        filterName: filterToSave.filterName,
        filter: this.filter,
      };
      this.filter = [];
      this.commonService.callApi(this.saveFilter, filter, 'post', false, false).then((success) => {
        if (success.status === 1) {
          this.popToast('success', 'Filter is saved Successfully');
          this.CallAPIgetSavedFilter();
        }
      });
      this.submitted = false;
      this.BsModalRef.hide();
    } else {
      this.popToast('error', 'Select Values to save');
    }
    saveFilterForm.reset();
  }

  public dataOfSaveFilter: any;

  CallAPIgetSavedFilter() {
    if (this.getFilter) {
      this.commonService.callApi(this.getFilter, '', 'get', false, false).then((success) => {
        if (success.status === 1) {
          this.dataOfSaveFilter = success.data;


        }
      });
    }
  }

  showSaveFilter(i) {
    this.APIparameters.filter = i.filter;
    this.callApiToGetData();
  }

  CallAPIdeleteSaveFilter(i, index) {

    this.commonService.callApi(this.deleteFilter + i._id, '', 'delete', false, false).then((success) => {
      if (success.status === 1) {
        this.popToast('success', success.message);

        this.dataOfSaveFilter.splice(index, 1);

        this.APIparameters.filter = "";
        this.callApiToGetData();
      }
    });
    this.CallAPIgetSavedFilter();
  }
  /***************************************************************/



  /*************************************************************************
  @PURPOSE      :SELECT ALL USERS IN TABLE 
  @PARAMETERS   : {
                  d :any
                 }
  /*************************************************************************/

  selectAllUser(i) {
    if (i.checkbox === true) {
      this.tableData.data.forEach((element) => {
        element.checkbox = true;
        if (this.selectedUserList.length) {
          const x = this.selectedUserList.findIndex((o) => o === element._id);
          if (x === -1) {
            this.selectedUserList.push(element._id);
          }
        } else {
          this.selectedUserList.push(element._id);
        }
      });
    } else {
      this.deselectMultipleUser();
    }
  }
  /***************************************************************/


  /*************************************************************************
  @PURPOSE      :Common Function
  
  /*************************************************************************/


  deselectMultipleUser() {

    this.tableData.data.forEach((element) => {
      element.checkbox = false;
      const x = this.selectedUserList.findIndex((o) => o === element._id);
      if (x > -1) {
        this.selectedUserList.splice(x, 1);
      }
    });
  }

  modifyFilterArr(fieldName, event) {
    const index = this.filter.findIndex((o) => Object.keys(o).includes(fieldName));
    if (index > -1) { this.filter[index][fieldName] = event; } else {
      this.filter.push({ [fieldName]: event });
    }
  }
  /***************************************************************/
  notFoundText: String;
  minSearchLength: number = 3
  isDate: boolean = false;

  searchByData(searchedTerm) {
    if (searchedTerm && searchedTerm.length >= 3) {
      var dateFormat = "MM/DD/YYYY";
      this.isDate = moment(searchedTerm, dateFormat, true).isValid();
      if (this.isDate) {
        var date = searchedTerm;
        var fromDate = new Date(date);
        this.APIparameters["fromDate"] = fromDate.toISOString();
        var toDate = new Date(date);
        toDate.setHours(23, 59, 59, 999);
        this.APIparameters["toDate"] = toDate.toISOString();
        if (this.APIparameters["searchTerm"]) {
          delete this.APIparameters["searchTerm"];
        }
        // this.getSearchList(searchedTerm);
        this.callApiToGetData()
      } else {
        this.APIparameters["searchTerm"] = searchedTerm;
        if (this.APIparameters["fromDate"]) {
          delete this.APIparameters["fromDate"]
        }
        if (this.APIparameters["toDate"]) {
          delete this.APIparameters["toDate"]
        }
        this.callApiToGetData()
        // this.getSearchList(this.APIparameters)
      }
    } else {
      delete this.APIparameters["searchTerm"];
      this.callApiToGetData()
    }
  }


  // getSearchList(event) {
  //   if (event.target.value.length) {

  //     if (event.target.value.length >= 3) {

  //       this.APIparameters["searchTerm"] = event.target.value;
  //       this.callApiToGetData()
  //     }
  //   }
  //   else {
  //     delete this.APIparameters.searchTerm;
  //     this.callApiToGetData()
  //   }
  // }

  changeCheckBoxValue() {
    this.rerenderDataTable()
  }







}
