import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../../../reusable/shared/shared.module';

// common
import { CanCreateAdminUserActivate, CanEditAdminUserActivate } from '../../../common/auth.gaurd';

// Component
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent, DetailComponent, CanEditAdminUserActivate, CanCreateAdminUserActivate],
  providers: [CanEditAdminUserActivate, CanCreateAdminUserActivate],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent, pathMatch: 'full' },
      {
        path: 'detail/:id',
        canActivate: [CanEditAdminUserActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'AddAdminUser',
        canActivate: [CanCreateAdminUserActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class AdminUsersModule { }
