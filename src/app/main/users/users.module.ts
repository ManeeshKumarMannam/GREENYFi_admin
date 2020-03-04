import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../../reusable/shared/shared.module';

// common
import { CanAdminUserActivate, CanUserActivate } from '../../common/auth.gaurd';

@NgModule({
  declarations: [CanUserActivate, CanAdminUserActivate],
  providers: [CanUserActivate, CanAdminUserActivate],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'users-list',
        pathMatch: 'full',
      },
      {
        path: 'users-list',
        loadChildren: 'src/app/main/users/users/users.module#UsersModule',
      },
      {
        path: 'volunteer',
        loadChildren: 'src/app/main/users/admin-users/admin-users.module#AdminUsersModule',
      },
    ]),
  ],
})
export class UsersModule { }
