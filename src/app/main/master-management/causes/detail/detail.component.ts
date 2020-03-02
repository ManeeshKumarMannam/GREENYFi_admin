import {
  Component, Injector, OnInit, ChangeDetectionStrategy,
  ChangeDetectorRef, ViewChild
} from '@angular/core';
import { BaseComponent } from '../../../../common/commonComponent';
import { IBreadcrumbs } from '../../../../common/interfaces';
import { _localeFactory } from '@angular/core/src/application_module';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent extends BaseComponent implements OnInit {
  public cause: any = {}
  public causeImageArray = [];
  public counter: number = 0;
  public ratingArray: any = [{}];
  public causesArray: any = [];
  public submitted: boolean = false;
  public causeId: any;
  public methodType: any;
  public apiName: string;
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  public imageVisible: boolean = true;
  public grapesJsData: any;
  public type = 'causeDetail';
  public gjs = 'gjs'
  constructor(public inj: Injector, public cd: ChangeDetectorRef) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.causeId = params.id;

      if (this.causeId) {
        this.getCauseDetailts();
        this.methodType = "put";
      }
      else {
        this.methodType = "post"
      }
    });
    this.causeId ? this.getCauseDetailts() : this.grapesJsData = { gjsHtml: '', gjsCss: '' };
    this.setBreadcrumbs();

  }

  ngOnInit() {
    this.chartiListing();

  }

  /*********************************************************************************
            @PURPOSE      : Set the Sub Header
            @PARAMETERS   : {
                             localKey: string //Heading Name
                              URL: any       
                             }
    /*********************************************************************************/
  setBreadcrumbs() {
    const title = this.causeId ? 'Edit Cause' : 'Add Cause';
    this.breadcrumbs = [
      { localeKey: 'Cause', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Master Management', url: this.URLConstants.CHARITY },
      { localeKey: 'Cause', url: this.URLConstants.CAUSE },
      { localeKey: title, url: null },
    ];
    this.subHeaderData = {
      title,
      breadcrumbs: this.breadcrumbs,
    };
  }

  /*********************************************************************************/


  /*********************************************************************************
            @PURPOSE      : Get the image ID
            @PARAMETERS   : {
                            id:any ==>image Id value     
                             }
    /*********************************************************************************/
  openfile(event) {
    event.preventDefault();
    document.getElementById('profile').click();
  }
  /***********************************************************************************/



  /****************************************************************************************
            @PURPOSE      : changing the images functionality
            @PARAMETERS   : {
                            event :any //image address
                            }
             @return       :Image Address          
   /**************************************************************************************/

  fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {

        }
        reader.readAsDataURL(event.target.files[i]);
        this.uploadImage(event.target.files[i])
      }
    }
  }
  /**************************************************************************************/


  /****************************************************************************************
           @PURPOSE      : Uploading the image 
           @PARAMETERS   : {
                           file :any //image address
                           }
            @return       :Image Address          
  /**************************************************************************************/
  uploadImage(file) {
    var fd = new FormData();
    fd.append('file', file);
    this.commonService.callApi(this.callAPIConstants.AdminFileUpload, fd, 'post', false, true).then(success => {
      if (success.status == 1) {
        this.imageVisible = false
        this.causeImageArray.push(success.data.filePath);
      } else {
        this.popToast('error', success.message)
      }
    })

  }

  /**************************************************************************************/

  /****************************************************************************************
            @PURPOSE      : chartiListing for Drop down
            @PARAMETERS   : {
                            page :any 
                            pagesize:any
                            }
             @return       :CauesList        
   /**************************************************************************************/
  chartiListing() {
    this.commonService.callApi(this.callAPIConstants.dropDownCharityListing, '', 'get', false, false, false).then((success) => {
      this.causesArray = success.data;

    })
  }
  /**************************************************************************************/

  /****************************************************************************************
          @PURPOSE      : Submit the Cause Form details
          @PARAMETERS   : {
                          Cause:object // All Charity Details
                          images :array  
                          rating :array 
                          }
 /****************************************************************************************/
  submitCause(causeForm, cause) {
    this.submitted = true;

    if (causeForm.form.controls.name.valid) {
      cause.gjsHtml = this.getToken('gjshtml');
      cause.gjsCss = this.getToken('gjscss');
      // cause.description = '<style>' + cause.gjsCss + '</style>' + cause.gjsHtml;
      cause.description = this.getToken('gjs-inlined-html');;
      cause['images'] = this.causeImageArray;
      cause["charities"] = cause.ratingValue
      if (this.causeId != undefined) {
        cause.causeId = this.causeId;
        this.apiName = this.callAPIConstants.updateCause;
      } else {
        this.apiName = this.callAPIConstants.addCause;
      }
      this.commonService.callApi(this.apiName, cause, this.methodType, false, false, false).then((success) => {
        if (success.status == 1) {

          this.popToast("success", success.meassage);
          this.removeToken('gjshtml');
          this.removeToken('gjscss');
          this.removeToken('gjscomponents');
          this.removeToken('gjsstyles');
          this.removeToken('gjsassets');
          this.removeToken('gjs-inlined-html');
          this.router.navigate([this.URLConstants.CAUSE])
        }
        else {
          this.popToast('error', success.message)
        }
      })

    }
  }
  /****************************************************************************************/
  ngOnDestroy() {
    this.removeToken('gjshtml');
    this.removeToken('gjscss');
    this.removeToken('gjscomponents');
    this.removeToken('gjsstyles');
    this.removeToken('gjsassets');
    this.removeToken('gjs-inlined-html')
    // this.removeToken('gjs-inlined-html');
  }

  /****************************************************************************************
          @PURPOSE      : Get the Cause Details
          @PARAMETERS   : {
                           charityId:any
                          }
  /****************************************************************************************/
  getCauseDetailts() {
    this.commonService.callApi(this.callAPIConstants.GetCauseDetails + this.causeId, '', 'get', false, false).then((success) => {
      if (success.status == 1) {
        this.cause = success.cause;
        this.causeImageArray = success.cause.images;
        this.cause.ratingValue = success.cause.charities;
        // if(success.cause.gjsHtml && success.cause.gjsCss)
        // {
        this.setToken('gjshtml', success.cause.gjsHtml);
        this.setToken('gjscss', success.cause.gjsCss);
        this.grapesJsData = { gjsHtml: success.cause.gjsHtml, gjsCss: success.cause.gjsCss }
        // }


      }
    })
  }

  /**************************************************************************************/


  /*********************************************************************************
            @PURPOSE      : Dlete the image 
            @PARAMETERS   : {
                            index:any ==>image Id value     
                             }
   /*********************************************************************************/

  deleteImage(index, icon?) {
    this.imageVisible = true;
    this.causeImageArray.splice(index, 1);

  }
}
  /****************************************************************************************/
