import {
  Component, Injector, OnInit, ChangeDetectionStrategy,
  ChangeDetectorRef, ViewChild
} from '@angular/core';
import { BaseComponent } from '../../../../common/commonComponent';
import { IBreadcrumbs } from '../../../../common/interfaces';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent extends BaseComponent implements OnInit {
  public charity: any = {}
  public counter: number = 0;
  public listArray: Array<any> = [];
  public dataVisible: boolean = true;
  public tabsHeading: any;
  public bannerImage: any;
  public homePageId: any;
  public submitted: boolean = false;
  @ViewChild('staticTabs') staticTabs;
  public iconImage: any;
  public imageElemet: any;
  public listArrayIndex: any;
  public images = [];
  public imageVisible: boolean = true;
  constructor(public inj: Injector, public cd: ChangeDetectorRef) {
    super(inj);


    this.activatedRoute.params.subscribe((params) => {
      this.homePageId = params.id;
      if (this.homePageId) {
        this.getHomeDetailts()
      }
    });
    this.setBreadcrumbs();

  }
  refresh() {
  }
  ngOnInit() {
    this.addForms();
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
      { localeKey: 'Content Management', url: this.URLConstants.HOME },
      { localeKey: 'Home', url: this.URLConstants.HOME },
      { localeKey: 'Edit Home', url: null },
    ];
    this.subHeaderData = {
      title: 'Edit Home',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*******************************************************************************/

  /****************************************************************************************
              @PURPOSE      : changing the images functionality
              @PARAMETERS   : {
                              event :any //image address
                              }
               @return       :Image Address          
  /**************************************************************************************/

  fileChangeEvent(event, icon?) {


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
        this.imageVisible = false;
        this.iconImage == 'images' ? this.images.push(success.data.filePath) : this.listArray[this.listArrayIndex].icon = success.data.filePath
      } else {
        this.popToast('error', success.message)
      }
    })
  }
  /**************************************************************************************/


  /*********************************************************************************
            @PURPOSE      : Get the image ID
            @PARAMETERS   : {
                            id:any ==>image Id value     
                             }
    /*********************************************************************************/
  openFile(event: any, icon, index?) {
    event.preventDefault();
    this.listArrayIndex = index;
    this.iconImage = icon;
    icon == "images" ? document.getElementById('profile').click() : document.getElementById('icon').click();

  }
  /*********************************************************************************/



  /**************************************************************************************/


  /*********************************************************************************
            @PURPOSE      : Dlete the image 
            @PARAMETERS   : {
                            index:any ==>image Id value     
                             }
   /*********************************************************************************/
  deleteImage(index, icon?) {
    this.imageVisible = true;
    this.images.splice(index, 1);
    if (icon) {
      delete this.listArray[index].icon;
    }

  }

  /*********************************************************************************
           @PURPOSE      : Submit the Home form Deatis
           @PARAMETERS   : {
                           charity :object //home form details
                            }
  /*********************************************************************************/
  submitHomeForm(homeForm, charity) {
    this.submitted = true;
    if (homeForm.valid) {
      charity["images"] = this.images;
      charity["donationWayTwo"] = this.listArray
      if (this.homePageId) {
        this.charity["homePageId"] = charity._id;
        this.commonService.callApi(this.callAPIConstants.updateHome, charity, 'post', false, false).then(success => {
          if (success.status == 1) {
            this.popToast('success', "Home Is Updated")
            this.router.navigate([this.URLConstants.HOME]);
          } else {
            this.popToast('error', success.message)
          }
        })
      }
      else {
        this.commonService.callApi(this.callAPIConstants.Addhome, charity, 'post', false, false).then(success => {
          if (success.status == 1) {

          } else {
            this.popToast('error', success.message)
          }
        })
      }
    }
  }
  /*********************************************************************************/


  /*********************************************************************************
           @PURPOSE      : showing  the multiple  forms
           @PARAMETERS   : {
                           counter :any 
                            }
  /*********************************************************************************/
  addForms() {
    this.counter++;
    let c = this.counter
    this.listArray.push({
      counter: c,
    })

  }


  /*********************************************************************************
           @PURPOSE      :Next Data functionality
           @PARAMETERS   : {
                           tabId :number
                           charity:object 
                            }
  /*********************************************************************************/
  selectTab(tabId: number, charity) {
    this.submitted = true;

    if (charity.title && charity.subTitle && charity.titleDescription && charity.aboutUsTitle && charity.numberOfcharities && charity.charitiesDescription && charity.numberOfVolunteers && charity.volunteersDescription && charity.numberOfDonations && charity.donationDescription && charity.donationWaysTitle && charity.stepsToRegTitle && charity.stepsToRegDescription && charity.donationWayOne && charity.charitiesTitle && charity.causesTitle) {
      this.staticTabs.tabs[tabId].active = true;
    }

  }
  /*********************************************************************************/


  /*********************************************************************************
             @PURPOSE       tabs functionality
             @PARAMETERS   : {
                             event :number
                            
  /***************************************************************************************/
  onSelect(event) {
    this.dataVisible = true;
  }
  /***************************************************************************************/



  /****************************************************************************************
             @PURPOSE        api to get Home details
             @PARAMETERS   : {
                             homePageId :any //passing the home id
                              } 
              @Return    : array of object //home page deatils              
  /***************************************************************************************/

  getHomeDetailts() {
    this.commonService.callApi(this.callAPIConstants.GetHomeDetails + this.homePageId, '', 'get', false, false).then((success) => {
      if (success.status == 1) {
        this.charity = success.checkPage;
        this.listArray = success.checkPage.donationWayTwo;
        this.images = success.checkPage.images
      }
    })
  }
}
  /*******************************************************************************************/
