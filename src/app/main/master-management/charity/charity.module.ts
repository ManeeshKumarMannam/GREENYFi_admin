import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanCharitytActivate } from '../../../common/auth.gaurd'
// resuable
import { SharedModule } from '../../../reusable/shared/shared.module';

// components
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { CanAddCharitytActivate, CanEditCharitytActivate } from '../../../common/auth.gaurd'

@NgModule({
  declarations: [ListComponent, DetailComponent, CanAddCharitytActivate, CanEditCharitytActivate],
  providers: [CanAddCharitytActivate, CanEditCharitytActivate],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent, pathMatch: 'full' },
      {
        path: 'addNewCharity',
        canActivate: [CanAddCharitytActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'detail/:id',
        canActivate: [CanEditCharitytActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class CharityModule { }
