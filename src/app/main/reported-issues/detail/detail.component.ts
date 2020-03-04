import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { IBreadcrumbs } from '../../../common/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent extends BaseComponent implements OnInit {
  public issueId: any;
  public issueDetails: any = {};
  constructor(public inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe(params => {
      this.issueId = params.id;
    })
    this.getIssueDetails();
    this.setBreadcrumbs();
  }

  ngOnInit() {
  }

  /*************************************************************/
  // Sub Header
  /*************************************************************/
  public breadcrumbs: IBreadcrumbs[];
  public subHeaderData: any;
  setBreadcrumbs() {
    this.breadcrumbs = [
      { localeKey: 'home', url: this.URLConstants.DASHBOARD },
      { localeKey: 'Reported Issues List', url: this.URLConstants.ISSUESLIST },
      { localeKey: 'Issue Details', url: null },
    ];
    this.subHeaderData = {
      title: 'Issue Details',
      breadcrumbs: this.breadcrumbs
    }
  }
  /*************************************************************/

  // api to get user details
  getIssueDetails() {
    this.commonService.callApi(this.callAPIConstants.getIssueDetails + this.issueId, '', 'get', false, false).then(success => {
      if (success.status == 1) {
        // if (success.data.photo) {
        //   success.data.photo = this.uploadImageUrl + success.data.photo;
        // }
        this.issueDetails = success.data;
      }
    })
  }

  status(event) {
    event.preventDefault();
  }
}
