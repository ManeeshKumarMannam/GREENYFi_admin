import { Component, OnInit, Injector, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../../common/commonComponent';
import { IBreadcrumbs, ITableSetupData } from '../../../../common/interfaces';
import { TabsetComponent } from 'ngx-bootstrap';
import { GrapesJSComponent } from 'src/app/reusable/grapes-js/grapes-js.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends BaseComponent implements OnInit {
  public charity: any = {}
  public counter: number = 3;
  public listArray: Array<any> = [];
  public dataVisible: boolean = true;
  public tabsHeading: any;
  public bannerImage: any;
  public homePageId: any;
  public submitted: boolean = false;
  public cameraIcon: boolean = false;
  // @ViewChild('staticTabs') staticTabs;
  @ViewChild(GrapesJSComponent) child2: GrapesJSComponent;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  @ViewChild('homeForm') homeForm;
  public iconImage: any;
  public imageElemet: any;
  public listArrayIndex: any;
  public images = [];
  public imageVisible: boolean = true;

  public grapesJsData1: any;
  public grapesJsData2: any;
  public grapesJsData3: any;
  public grapesJsData4: any;
  public grapesJsData5: any;
  public type = 'benefitsOfReg';
  public type2 = 'question';
  public type3 = 'donationone';
  public type4 = 'donationtwo';
  public type5 = 'donors';
  public gjs1 = 'gjs1'
  public gjs2 = 'gjs2'
  public gjs3 = 'gjs3'
  public gjs4 = 'gjs4'
  public gjs5 = 'gjs5'
  tabid: number;
  constructor(public inj: Injector, public cd: ChangeDetectorRef) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.homePageId = params.id;
      // this.getHomeListing();
      this.getHomeDetailts()

      this.grapesJsData1 = { gjs1Html: '', gjs1Css: '' };
      this.grapesJsData2 = { gjs2Html: '', gjs2Css: '' };
      this.grapesJsData3 = { gjs3Html: '', gjs3Css: '' };
      this.grapesJsData4 = { gjs4Html: '', gjs4Css: '' };
      this.grapesJsData5 = { gjs5Html: '', gjs5Css: '' };

    });
    this.setBreadcrumbs();

  }

  public disabledValue: boolean = true
  ngOnInit() {
    this.disabledValue = true;
    this.addForms()
    {

      for (let i = 2; i > 0; i--) {
        this.listArray.push({
          counter: i,
        })
      }
    }
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
      { localeKey: 'Home', url: null },
    ];
    this.subHeaderData = {
      title: 'Home',
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

  fileChangeEvent(event, index?, type?) {

    this.listArrayIndex = index;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
        }
        reader.readAsDataURL(event.target.files[i]);
        this.uploadImage(event.target.files[i], type)
      }
    }
  }
  /**************************************************************************************/
  // getHomeListing() {
  //   this.commonService.callApi(this.callAPIConstants.homeList, { page: 1, pagesize: 10 }, 'post').then((success) => {

  //     this.homePageId = success.data.listing[0]._id;
  //     if (this.homePageId) {
  //       this.getHomeDetailts();
  //     }
  //   })
  // }

  /****************************************************************************************
           @PURPOSE      : Uploading the image 
           @PARAMETERS   : {
                           file :any //image address
                           }
            @return       :Image Address          
  /**************************************************************************************/
  uploadImage(file, type) {
    var fd = new FormData();
    fd.append('file', file);
    this.commonService.callApi(this.callAPIConstants.AdminFileUpload, fd, 'post', false, true).then(success => {
      if (success.status == 1) {
        this.imageVisible = false;

        type != 'icon' ? this.images.push(success.data.filePath) : this.listArray[this.listArrayIndex].icon = success.data.filePath;

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
  openFile(event: any, icon) {
    event.preventDefault();
    // this.listArrayIndex = index;

    // this.iconImage = icon;
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
  public charityData: any = {};
  submitHomeForm(homeForm, charity) {
    this.submitted = true;
    if (homeForm.valid) {
      this.charityData.images = charity.images;
      this.charityData.title = charity.title;
      this.charityData.subTitle = charity.subTitle;
      this.charityData.titleDescription = charity.titleDescription;
      this.charityData._id = charity._id
      this.commonApiCall(this.charityData)

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
  selectTab(tabId: number, charity, data?) {
    // console.log(tabId);
    this.tabid = tabId
    // this.disabledValue = true;
    // this.submitted = true;
    this.staticTabs.tabs[tabId].active = true;
    this.getHomeDetailts(data);
    // if (charity.title && charity.subTitle && charity.titleDescription && charity.aboutUsTitle && charity.numberOfcharities && charity.charitiesDescription && charity.numberOfVolunteers && charity.volunteersDescription && charity.numberOfDonations && charity.donationDescription && charity.donationWaysTitle && charity.stepsToRegTitle && charity.stepsToRegDescription && charity.donationWayOne && charity.charitiesTitle && charity.causesTitle) {
    //   this.staticTabs.tabs[tabId].active = true;
    // }

  }
  /*********************************************************************************/
  editData() {
    this.disabledValue = !this.disabledValue;
    this.cameraIcon = true;
  }

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

  getHomeDetailts(data?) {
    this.commonService.callApi(this.callAPIConstants.GetHomeDetails, '', 'get', false, false).then((success) => {
      if (success.status == 1) {
        this.charity = success.checkPage;
        this.listArray = success.checkPage.donationWay;
        this.images = success.checkPage.images;
        this.setToken('gjs1html', this.charity.benefitsOfRegHtml);
        this.setToken('gjs1css', this.charity.benefitsOfRegDesc);
        this.setToken('gjs2html', this.charity.questionHtml);
        this.setToken('gjs2css', this.charity.questionCss);
        this.setToken('gjs3html', this.charity.donateOptionOneHtml);
        this.setToken('gjs3css', this.charity.donateOptionOneCss);
        this.setToken('gjs4html', this.charity.donateOptionTwoDesc);
        this.setToken('gjs4css', this.charity.donateOptionTwoDesc);
        this.setToken('gjs5html', this.charity.donarsDescriptionHtml);
        this.setToken('gjs5css', this.charity.donarsDescriptionCss);

      }
    })
  }
  /*******************************************************************************************/


  /****************************************************************************************
               @PURPOSE        api to submit the section 2 details
               @PARAMETERS   : {
                               homePageId :any //passing the home id
                                } 
                @Return    : array of object //home page deatils              
    /***************************************************************************************/

  submitSection2Form(form, data) {
    let donationsData: any = {};
    donationsData.charitiesTitle = data.charitiesTitle;
    donationsData.causesTitle = data.causesTitle;
    donationsData.stepsToRegTitle = data.stepsToRegTitle;
    donationsData.stepsToRegDescription = data.stepsToRegDescription;
    donationsData.donationWay = data.donationWay;
    donationsData._id = data._id
    // donationsData.
    this.commonApiCall(donationsData)
  }
  submitSection5Form(form, data) {
    let noofdata: any = {};
    noofdata.numberOfcharities = data.numberOfcharities;
    noofdata.numberOfVolunteers = data.numberOfVolunteers;
    noofdata.numberOfDonations = data.numberOfDonations;
    noofdata.volunteersDescription = data.volunteersDescription;
    noofdata.donationDescription = data.donationDescription;
    noofdata.charitiesDescription = data.charitiesDescription;
    noofdata._id = data._id
    this.commonApiCall(noofdata)

  }
  submiSection3Form(form, data) {
    let benefitsData: any = {};
    benefitsData.benefitsOfReg = data.benefitsOfReg;
    benefitsData.benefitsOfRegCss = this.getToken('gjs1css');
    benefitsData.benefitsOfRegHtml = this.getToken('gjs1html');
    benefitsData.benefitsOfRegDesc = '<style>' + benefitsData.benefitsOfRegCss + '</style>' + benefitsData.benefitsOfRegHtml;
    benefitsData.question = data.question;
    benefitsData.questionHtml = this.getToken('gjs2html');
    benefitsData.questionCss = this.getToken('gjs2css');
    benefitsData.questionDesc = '<style>' + this.getToken('gjs2css') + '</style>' + this.getToken('gjs2html');
    benefitsData._id = data._id;
    this.commonApiCall(benefitsData);


  }
  submitSection4Form(form, data) {
    let donorsData: any = {};
    donorsData.howDonate = data.howDonate;
    donorsData.howDonateDesc = data.howDonateDesc;
    donorsData.donateOptionOneTitle = data.donateOptionOneTitle;
    donorsData.donateOptionOneCss = this.getToken('gjs3css');
    donorsData.donateOptionOneHtml = this.getToken('gjs3html');
    donorsData.donateOptionOneDesc = '<style>' + this.getToken('gjs3css') + '</style>' + this.getToken('gjs3html');
    donorsData.donateOptionTwoTitle = data.donateOptionTwoTitle;
    donorsData.donateOptionTwoCss = this.getToken('gjs4css');
    donorsData.donateOptionTwoHtml = this.getToken('gjs4html');
    donorsData.donateOptionTwoDesc = '<style>' + this.getToken('gjs4css') + '</style>' + this.getToken('gjs4html');
    donorsData.donarsDescriptionCss = this.getToken('gjs5css');
    donorsData.donarsDescriptionHtml = this.getToken('gjs5html');
    donorsData.donarsDescription = '<style>' + this.getToken('gjs5css') + '</style>' + this.getToken('gjs5html');
    donorsData.donarsTitle = data.donarsTitle;

    donorsData._id = data._id;
    this.commonApiCall(donorsData);
  }
  commonApiCall(charityData) {
    this.commonService.callApi(this.callAPIConstants.updateHome, charityData, 'post', false, false).then(success => {
      if (success.status == 1) {
        this.popToast('success', 'Home is Updated');
        this.router.navigate([this.URLConstants.HOME]);
      } else {
        this.popToast('error', success.message)
      }
    })
  }
  ngOnDestroy() {
    this.removeToken('gjs1css');
    this.removeToken('gjs1html');
    this.removeToken('gjs2html');
    this.removeToken('gjs2css');
    this.removeToken('gjs3html');
    this.removeToken('gjs4css');
    this.removeToken('gjs4html');
    this.removeToken('gjs3css');
    this.removeToken('gjs3components')
    this.removeToken('gjs2components');
    this.removeToken('gjs1components');
    this.removeToken('gjs4components');
    this.removeToken('gjs1assets');
    this.removeToken('gjs2assets');
    this.removeToken('gjs3assets');
    this.removeToken('gjs4assets');
    this.removeToken('gjs3styles');
    this.removeToken('gjs4styles');
    this.removeToken('gjs2styles');
    this.removeToken('gjs1styles');
    this.removeToken('gjs5html');
    this.removeToken('gjs5css')
  }
}