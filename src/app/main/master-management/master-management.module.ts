import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanCharitytActivate, CanCausetActivate } from '../../common/auth.gaurd'
// resuable
import { SharedModule } from '../../reusable/shared/shared.module';

// Component

@NgModule({
  declarations: [CanCharitytActivate, CanCausetActivate],
  providers: [CanCharitytActivate, CanCausetActivate],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'charity', pathMatch: 'full' },
      {
        path: 'charity',
        canActivate: [CanCharitytActivate],
        loadChildren: 'src/app/main/master-management/charity/charity.module#CharityModule',
      },
      {
        path: 'causes',
        canActivate: [CanCausetActivate],
        loadChildren: 'src/app/main/master-management/causes/causes.module#CausesModule',
      },
    ]),
  ],
})
export class MasterManagementModule { }
