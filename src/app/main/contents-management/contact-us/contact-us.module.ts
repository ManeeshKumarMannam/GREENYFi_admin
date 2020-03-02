import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanInquirytActivate } from '../../../common/auth.gaurd'
// reusable
import { SharedModule } from '../../../reusable/shared/shared.module';

@NgModule({
  declarations: [CanInquirytActivate],
  providers: [CanInquirytActivate],

  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', redirectTo: 'faq', pathMatch: 'full',
      },
      {
        path: 'faq', loadChildren: 'src/app/main/contents-management/contact-us/faq/faq.module#FaqModule',
      },
      {
        path: 'inquiry',
        canActivate: [CanInquirytActivate],
        loadChildren: 'src/app/main/contents-management/contact-us/inquiry/inquiry.module#InquiryModule',
      },
    ]),
  ],
})
export class ContactUsModule { }
