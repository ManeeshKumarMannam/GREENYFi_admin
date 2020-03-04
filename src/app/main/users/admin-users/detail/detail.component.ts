import { Component, Injector, OnInit } from '@angular/core';

// common
import { BaseComponent } from '../../../../common/commonComponent';
import { IBreadcrumbs } from '../../../../common/interfaces';

// plugin
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent extends BaseComponent implements OnInit {
  public adminUserId: any;
  public roleList: any[] = [];
  public title: any;
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  public files: NgxFileDropEntry[] = [];
  public imageUrl;
  public fileUpload = new FormData();
  public admin = { photo: '', firstname: '', lastname: '', role: '', emailId: '', mobile: '' };
  public submitted = false;
  public changeStatusfiled: any;
  constructor(public inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.adminUserId = params.id;
      this.admin['status'] = true;
    });
    this.getRoleList();
    this.title = 'Add Admin User';
    if (this.adminUserId) {
      this.title = 'Edit Admin User';
      this.getAdminUserDetails();
    }


    this.setBreadcrumbs();
  }

  ngOnInit() {


  }

  /*************************************************************************
         @PURPOSE      : Set the Sub Header
         @PARAMETERS   : {
                          localKey: string //Heading Name
                           URL: any       
                          }
 /*************************************************************************/
  setBreadcrumbs() {
    const title = this.adminUserId ? 'Edit Admin User' : 'Add Admin User';
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Volunteer List', url: this.URLConstants.USERS },
    ];
    this.subHeaderData = {
      title,
      breadcrumbs: this.breadcrumbs,
    };
  }
  /***********************************************************************/


  /*************************************************************************
        @PURPOSE      : API to get admin user details
        @PARAMETERS   : {
                         Id: any //Admin User Id
                         }
  /*************************************************************************/
  getAdminUserDetails() {
    this.commonService.callApi(this.callAPIConstants.AdminGetUserDetails + this.adminUserId, '', 'get', false, false).then((success) => {
      this.admin = success.data;
    });
  }




  /*************************************************************************
       @PURPOSE      :  API to get role List on dropdown
       @PARAMETERS   : {
                       page:any
                       pagesize:any;
                       params:any //roles list
                        }
 /*************************************************************************/

  getRoleList() {
    const params = { page: 1, pagesize: 10 };
    this.commonService.callApi(this.callAPIConstants.RoleList, params, 'post', false, false).then((success) => {
      this.roleList = success.data.listing;
    });
  }
  /*************************************************************************/





  /***********************************************************************************
        @PURPOSE      : Add or Update Admin User
        @PARAMETERS   : {
                        admin :object //admin detais
                        }
  /************************************************************************************/
  addAdmin(adminForm, admin) {

    this.submitted = true;
    if (adminForm.valid) {
      if (this.adminUserId) {
        admin.userId = admin._id;
        this.commonService.callApi(this.callAPIConstants.AdminUpdateUser, admin, 'post', false, false).then((success) => {
          if (success.status === 1) {
            this.router.navigate([this.URLConstants.ADMINUSER_LIST]);
            this.popToast('success', 'Updated Successfully');
          }
        });
      } else {
        admin.role = admin.role._id;
        this.commonService.callApi(this.callAPIConstants.AdminAddAdminUser, admin, 'post', false, false).then((success) => {
          if (success.status === 1) {
            this.router.navigate([this.URLConstants.ADMINUSER_LIST]);
            this.popToast('success', success.message);
            adminForm.reset();
            this.submitted = false;
          } else {
            this.popToast('error', success.message);
          }
        });
      }
    }
  }
  /*************************************************************************************/



  /**************************************************************************************
       @PURPOSE      : Image Uploading 
       @PARAMETERS   : {
                       imageUrl :Form data //Image Address
                       }
 /***************************************************************************************/
  uploadImage() {
    this.commonService.callApi(this.callAPIConstants.AdminFileUpload, this.fileUpload, 'post', false, true).then((success) => {
      if (success.status === 1) {
        this.admin.photo = success.data.filePath;
        this.imageUrl = '';
        this.fileUpload.delete('file');
      }
      else {
        this.popToast('error', success.message)
      }
    });
  }
  /***************************************************************************************/




  /**************************************************************************************
       @PURPOSE      : Cancel The Image  
       @PARAMETERS   : {
                       imageUrl :Form data //Image Address
                       }
 /***************************************************************************************/

  cancelUploadImage() {
    console.log(this.imageUrl, "12");

    this.imageUrl = '';
  }
  /***************************************************************************************/






  /**************************************************************************************
       @PURPOSE      : Dropping the Image functionality
      
 /***************************************************************************************/
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageUrl = this.sanitize.bypassSecurityTrustUrl(e.target.result);
            this.fileUpload = new FormData();
            this.fileUpload.append('file', file);
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }

  public fileOver(event) {
  }

  public fileLeave(event) {
  }
  /**************************************************************************************/


}
