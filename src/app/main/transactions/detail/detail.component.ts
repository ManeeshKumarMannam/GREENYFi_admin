import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/common/commonComponent';
import { IBreadcrumbs } from '../.../../../../common/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent extends BaseComponent implements OnInit {
  public transactionID: any;
  public transaction: any = {};
  public transactionDeatils: any = [];
  constructor(inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe((params) => {
      this.transactionID = params.id;
      if (this.transactionID) {
        this.TranscactionDetail()
      }
    });
    this.setBreadcrumbs();
  }

  ngOnInit() {
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
    const title = this.transactionID ? 'Transaction Details' : '';
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Transactions', url: this.URLConstants.TRANSACTIONS },
      { localeKey: title, url: null },
    ];
    this.subHeaderData = {
      title,
      breadcrumbs: this.breadcrumbs,
    };
  }
  /*********************************************************************************/




  /*********************************************************************************
             @PURPOSE      : api to get Transcaction details
             @PARAMETERS   : {
                              transactionID: any //faq Id
                             }
  /*********************************************************************************/
  TranscactionDetail() {
    let Id = {}
    Id = this.transactionID;


    this.commonService.callApi(this.callAPIConstants.transctionDetails + Id, '', 'get').then((success) => {
      this.transaction = success.data;

      this.transactionDeatils = success.data.transactionDetails
    });
  }
  /*********************************************************************************/

}
