
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
  public charity: any = {}
  public chaityImgArray = [];
  public counter: number = 3;
  public grapesJsData: any;
  public ratingArray: Array<any> = [];
  public causesArray: any = [];
  public submitted: boolean = false;
  public charityId: any
  public displayCharityImage: Array<any> = [];
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  public type = 'charityDetail';
  public gjs = 'gjs'
  public ratingValues = [{ name: 1, value: 1 }, { name: 1.5, value: 1.5 }, { name: 2, value: 2 }, { name: 2.5, value: 2.5 }, { name: 3, value: 3 }, { name: 3.5, value: 3.5 }, { name: 4, value: 4 },
  ]
  public ratingNames = [{ name: "Overall Score & Rating", value: "Overall Score & Rating" }, { name: "Financial", value: "Financial" }, { name: "Accountability and Transparency", value: "Accountability and Transparency" }]
  public scoreError: any = [false, false, false];

  constructor(public inj: Injector, public cd: ChangeDetectorRef) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.charityId = params.id;
    });
    this.charityId ? this.getCharityDetailts() : this.grapesJsData = { gjsHtml: '', gjsCss: '' };
    this.setBreadcrumbs();
  }

  ngOnInit() {
    this.addRating()
    {

      for (let i = 2; i > 0; i--) {
        this.ratingArray.push({
          counter: i,
        })
      }

    }
    this.dropDownCausesListing();
  }


  /*********************************************************************************
          @PURPOSE      : Set the Sub Header
          @PARAMETERS   : {
                           localKey: string //Heading Name
                            URL: any       
                           }
  /*********************************************************************************/
  setBreadcrumbs() {
    const title = this.charityId ? 'Edit Charity' : 'Add Charity';
    this.breadcrumbs = [
      { localeKey: 'Charity', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Master Management', url: this.URLConstants.CHARITY },
      { localeKey: 'Charity', url: this.URLConstants.CHARITY },
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
           @PURPOSE      : while clicking  the addRating button it shwoing the mutilple forms
           @PARAMETERS   : {
                           counter :number //pushing the counter value in rationg Array
                            }
   /**************************************************************************************/
  addRating() {
    this.counter = 7;
    let c = this.counter
    this.ratingArray.push({
      counter: c,
    })
  }
  /**************************************************************************************/

  /****************************************************************************************
          @PURPOSE      : while typing  the score it checks less than 100 or not
          @PARAMETERS   : {
                          score :number 
                          }
  /**************************************************************************************/
  validateScore(score, index) {
    if (score <= 100) {
      this.scoreError[index] = false;
    } else {
      this.scoreError[index] = true;
    }
  }
  /**************************************************************************************/

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
        this.displayCharityImage[0] = success.data.filePath;
        this.chaityImgArray.push(success.data.filePath);
      } else {
        this.popToast('error', success.message)
      }
    })
  }
  /**************************************************************************************/


  /****************************************************************************************
           @PURPOSE      : causesListing for Drop down
           @PARAMETERS   : {
                           page :any 
                           pagesize:any
                           }
            @return       :CauesList        
  /**************************************************************************************/
  dropDownCausesListing() {
    this.commonService.callApi(this.callAPIConstants.dropDownCausesListing, '', 'get', false, false, false).then((success) => {
      this.causesArray = success.data;
    })
  }
  /**************************************************************************************/
  ngOnDestroy() {
    this.removeToken('gjshtml');
    this.removeToken('gjscss');
    this.removeToken('gjscomponents');
    this.removeToken('gjsstyles');
    this.removeToken('gjsassets');
    this.removeToken('gjs-inlined-html')
  }

  /****************************************************************************************
          @PURPOSE      : Submit the Charity Form details
          @PARAMETERS   : {
                          charity:object // All Charity Details
                          images :array  
                          rating :array 
                          }
 /****************************************************************************************/
  submitCharityForm(charityForm, charity) {
    this.submitted = true;
    if (charityForm.form.controls.txnId.valid && charityForm.form.controls.name.valid && charityForm.form.controls.subDescription.valid) {
      charity.gjsHtml = this.getToken('gjshtml');
      charity.gjsCss = this.getToken('gjscss');
      charity.description = this.getToken('gjs-inlined-html');
      charity['images'] = this.displayCharityImage;
      charity['rating'] = this.ratingArray;
      charity["causes"] = charity.ratingValue
      if (this.charityId) {
        charity["charityId"] = this.charityId;
        this.commonService.callApi(this.callAPIConstants.updateCharity, charity, 'put', false, false, false).then((success) => {
          if (success.status == 1) {
            this.popToast("success", success.message);
            this.router.navigate([this.URLConstants.CHARITY])
          }
          else {
            this.popToast('error', success.message)
          }
        })
      }
      else {

        this.commonService.callApi(this.callAPIConstants.addCharity, charity, 'post', false, false, false).then((success) => {
          if (success.status == 1) {
            this.popToast("success", success.message);
            this.router.navigate([this.URLConstants.CHARITY])
          }
          else {
            this.popToast('error', success.message)
          }
        })
      }
    }
    this.removeToken('gjshtml');
    this.removeToken('gjscss');
    this.removeToken('gjscomponents');
    this.removeToken('gjsstyles');
    this.removeToken('gjsassets');
    this.removeToken('gjs-inlined-html');
  }
  /****************************************************************************************/



  /****************************************************************************************
          @PURPOSE      : Remove the rating Data
          @PARAMETERS   : {
                           index:any
                          }
 /****************************************************************************************/
  // removeRating(index) {
  //   console.log(index, "index remove");

  //   this.ratingArray.splice(index, 1)
  // }


  /****************************************************************************************
         @PURPOSE      : Get the charity Details
         @PARAMETERS   : {
                          charityId:any
                         }
 /****************************************************************************************/
  getCharityDetailts() {
    this.commonService.callApi(this.callAPIConstants.GetCharityDetails + this.charityId, '', 'get', false, false).then((success) => {

      if (success.status == 1) {
        // this.charityId ? this.grapesJsData = { gjsHtml: success.charity.gjsHtml, gjsCss: success.charity.gjsCss } : null
        this.charity = success.charity;
        this.ratingArray = success.charity.rating;
        this.ratingArray.forEach(obj => {
          if (obj.score) {
            var y = obj.score;
            var z = y.toString().split(".");
            if (z.length == 1) { obj.score = z + ".00" } else { obj.score = y }
          }
        })
        this.charity.ratingValue = success.charity.causes;
        this.displayCharityImage = success.charity.images;
        // if (success.charity.gjsHtml && success.charity.gjsCss) {
        this.setToken('gjshtml', success.charity.gjsHtml);
        this.setToken('gjscss', success.charity.gjsCss);

        this.grapesJsData = { gjsHtml: success.charity.gjsHtml, gjsCss: success.charity.gjsCss }

        // }


      }
    })
  }
}
/****************************************************************************************/