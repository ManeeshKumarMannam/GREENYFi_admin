import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../../reusable/shared/shared.module';

// common
import { CanUserDetailActivate } from '../../common/auth.gaurd';

// Component
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
@NgModule({
  declarations: [DetailComponent, ListComponent],
  providers: [],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ListComponent, pathMatch: 'full' },
      {
        path: ':id',
        component: DetailComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class ReportedIssuesModule { }
