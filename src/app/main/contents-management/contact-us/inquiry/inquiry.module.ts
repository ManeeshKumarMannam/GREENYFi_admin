import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../../../../reusable/shared/shared.module';
import { CanInquiryAddtActivate } from '../../../../common/auth.gaurd';
// components
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent, DetailComponent, CanInquiryAddtActivate],
  providers: [CanInquiryAddtActivate],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent, pathMatch: 'full' },
      {
        path: 'detail',
        // canActivate: [CanInquiryAddtActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'detail/:id',
        // canActivate: [CanInquirytActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class InquiryModule { }
