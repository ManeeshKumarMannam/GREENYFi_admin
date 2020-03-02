import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// resuable
import { SharedModule } from '../../reusable/shared/shared.module';

// common
import { CanCreateManageRoleActivate, CanEditManageRoleActivate } from '../../common/auth.gaurd';

// components
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent, DetailComponent, CanEditManageRoleActivate, CanCreateManageRoleActivate],
  providers: [CanEditManageRoleActivate, CanCreateManageRoleActivate],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', redirectTo: 'list', pathMatch: 'full',
      },
      {
        path: 'list', component: ListComponent, pathMatch: 'full',
      },
      {
        path: 'detail/:id',
        canActivate: [CanEditManageRoleActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'addNewRole',
        canActivate: [CanCreateManageRoleActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class ManageRolesModule { }
