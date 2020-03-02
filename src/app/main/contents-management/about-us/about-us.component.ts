import { Component, OnInit, Injector, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { IBreadcrumbs } from '../../../common/interfaces';
import { GrapesJSComponent } from '../../../reusable/grapes-js/grapes-js.component';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styles: []
})

export class AboutUsComponent extends BaseComponent implements OnInit {
  public submitted = false;
  public aboutus: any = {};
  public grapesJsData1: any;
  public grapesJsData2: any;
  public grapesJsData3: any;
  public grapesJsData4: any;
  public index: any;
  public type = 'aboutus';
  public type2 = 'aboutus1';
  public type3 = 'aboutus2';
  public gjs1 = 'gjs1'
  public gjs2 = 'gjs2'
  public gjs3 = 'gjs3';
  public gjs4 = 'gjs4';
  public type4 = 'aboutus4'
  public picType;
  public firstImage: any;
  public secondImage: any;
  public thirdImage: any;
  public memeberArray = [];
  public counter: number = 4;
  public aboutUsId: any;
  public grape: boolean;
  @ViewChild(GrapesJSComponent) child1: GrapesJSComponent;
  @Output() grapesjsId: any;
  public Index: any;
  constructor(public inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.aboutUsId = params.id;


      // if (this.aboutUsId) {
      this.getAboutUsetails();
      // }
    });

    //this.cmsID ? this.getCMSDetail() : 
    this.grapesJsData1 = { gjs1Html: '', gjs1Css: '' };
    this.grapesJsData2 = { gjs2Html: '', gjs2Css: '' };
    this.grapesJsData3 = { gjs3Html: '', gjs3Css: '' };
    this.grapesJsData4 = { gjs4Html: '', gjs4Css: '' };

    this.setBreadcrumbs();
  }

  ngOnInit() {

    this.MemberDtails()
    // {

    for (let i = 2; i > 0; i--) {
      this.memeberArray.push({
        counter: i,
      })
    }

  }

  MemberDtails() {
    this.counter = 3
    let c = this.counter
    this.memeberArray.push({
      counter: c,
    })
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
      { localeKey: 'about', url: this.URLConstants.DASHBOARD },
      { localeKey: 'About Us', url: this.URLConstants.ABOUT_US },
      { localeKey: 'About Us', url: null },
    ];
    this.subHeaderData = {
      title: 'About Us',
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*************************************************************/


  /*********************************************************************************
          @PURPOSE      :   api to get getAboutUsetails details
          @PARAMETERS   : ""
  /*********************************************************************************/

  getAboutUsetails(data?) {
    if (data == 'cancel') {
      this.removeToken('gjs1html');
      this.removeToken('gjs1css');
      this.removeToken('gjs2html');
      this.removeToken('gjs2css');
      this.removeToken('gjs3html');
      this.removeToken('gjs3css');
      this.removeToken('gjs3components')
      this.removeToken('gjs2components');
      this.removeToken('gjs1components');
      this.removeToken('gjs1assets');
      this.removeToken('gjs2assets');
      this.removeToken('gjs3assets');
      this.removeToken('gjs3styles');
      this.removeToken('gjs2styles');
      this.removeToken('gjs1styles');
      for (let i = 0; i < this.memeberArray.length; i++) {
        this.removeToken('gjs4' + i + 'html');
        this.removeToken('gjs4' + i + 'css');
      }
      this.grape = false
      if (this.child1._editor[this.gjs1]) {
        this.child1._editor[this.gjs1].destroy();
      }
      if (this.child1._editor[this.gjs2]) {
        this.child1._editor[this.gjs2].destroy();
      }
      if (this.child1._editor[this.gjs3]) {
        this.child1._editor[this.gjs3].destroy();
      }
      if (this.child1._editor[this.gjs4]) {
        this.child1._editor[this.gjs4].destroy();
      }

    }
    this.commonService.callApi(this.callAPIConstants.GetAboutusDetails, '', 'get').then((success) => {
      if (success.status === 1) {
        this.aboutus = success.data;
        this.memeberArray = success.data.boardDetails;
        for (let i = 0; i < this.memeberArray.length; i++) {
          this.memeberArray[i].descriptionHtml = this.setToken('gjs4' + i + 'html', this.aboutus.boardDetails[i].descriptionHtml);
          this.memeberArray[i].descriptionCss = this.setToken('gjs4' + i + 'css', this.aboutus.boardDetails[i].descriptionCss);
        }
        this.setToken('gjs1html', this.aboutus.titleDescriptiongjsHtml);
        this.setToken('gjs1css', this.aboutus.titleDescriptiongjsCss);
        this.setToken('gjs2html', this.aboutus.ourNameDescriptiongjsHtml);
        this.setToken('gjs2css', this.aboutus.ourNameDescriptiongjsCss);
        this.setToken('gjs3html', this.aboutus.whyWeMatterDescriptiongjsHtml);
        this.setToken('gjs3css', this.aboutus.whyWeMatterDescriptiongjsCss);
        this.grape = true
      }
    });
  }


  /*********************************************************************************
          @PURPOSE      : api to update smtp details
          @PARAMETERS   : {
                           smtp: object //Heading Name
                           }
  /*********************************************************************************/

  SubmitAboutForm(aboutUsForm, aboutus) {

    aboutus.titleDescriptiongjsHtml = this.getToken('gjs1html');
    aboutus.titleDescriptiongjsCss = this.getToken('gjs1css');
    aboutus.titleDescription = '<style>' + aboutus.titleDescriptiongjsCss + '</style>' + aboutus.titleDescriptiongjsHtml;
    aboutus.ourNameDescriptiongjsHtml = this.getToken('gjs2html');
    aboutus.ourNameDescriptiongjsCss = this.getToken('gjs2css');
    aboutus.ourNameDescription = '<style>' + aboutus.ourNameDescriptiongjsHtml + '</style>' + aboutus.ourNameDescriptiongjsHtml;
    aboutus.whyWeMatterDescriptiongjsHtml = this.getToken('gjs3html');
    aboutus.whyWeMatterDescriptiongjsCss = this.getToken('gjs3css');
    aboutus.whyWeMatterDescription = '<style>' + aboutus.whyWeMatterDescriptiongjsHtml + '</style>' + aboutus.whyWeMatterDescriptiongjsHtml;

    for (let i = 0; i < this.memeberArray.length; i++) {
      this.memeberArray[i].description = '<style>' + this.getToken('gjs4' + i + 'css') + '</style>' + this.getToken('gjs4' + i + 'html');
      this.memeberArray[i].descriptionHtml = this.getToken('gjs4' + i + 'html');
      this.memeberArray[i].descriptionCss = this.getToken('gjs4' + i + 'css');
    }
    this.aboutus['boardDetails'] = this.memeberArray;

    this.submitted = true;



    // if (aboutUsForm.valid) {
    this.commonService.callApi(this.callAPIConstants.UpdateAboutusDetails, aboutus, 'post', false, false).then((success) => {
      if (success.status === 1) {
        this.popToast('success', 'Data Stored Successfully');
      }
    });
    // }
  }
  openFile(event, imageType, index) {

    this.picType = imageType

    imageType = 'memberOneImage' ? document.getElementById('firstImage').click() : imageType = 'memberTwoImage' ? document.getElementById('secondImage').click() : document.getElementById('thirdImage').click();

  }
  fileChangeEvent(event, type, index?) {

    this.Index = index;
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
  uploadImage(file, type) {

    var fd = new FormData();
    fd.append('file', file);
    this.commonService.callApi(this.callAPIConstants.AdminFileUpload, fd, 'post', false, true).then(success => {
      if (success.status == 1) {
        this.memeberArray[this.Index].image = success.data.filePath;

      } else {
        this.popToast('error', success.message)
      }
    })
  }

  ngOnDestroy() {
    this.removeToken('gjs1html');
    this.removeToken('gjs1css');
    this.removeToken('gjs2html');
    this.removeToken('gjs2css');
    this.removeToken('gjs3html');
    this.removeToken('gjs3css');
    this.removeToken('gjs3components')
    this.removeToken('gjs2components');
    this.removeToken('gjs1components');
    this.removeToken('gjs1assets');
    this.removeToken('gjs2assets');
    this.removeToken('gjs3assets');
    this.removeToken('gjs3styles');
    this.removeToken('gjs2styles');
    this.removeToken('gjs1styles');
    for (let i = 0; i < this.memeberArray.length; i++) {
      this.removeToken('gjs4' + i + 'html');
      this.removeToken('gjs4' + i + 'css');
    }
  }
}
