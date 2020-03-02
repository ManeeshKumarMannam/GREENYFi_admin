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
        canActivate: [CanUserActivate],
        loadChildren: 'src/app/main/users/users/users.module#UsersModule',
      },
      {
        path: 'Admin-User',
        canActivate: [CanAdminUserActivate],
        loadChildren: 'src/app/main/users/admin-users/admin-users.module#AdminUsersModule',
      },
      {
        path: 'guest-user',
        canActivate: [CanAdminUserActivate],
        loadChildren: 'src/app/main/users/guest-users/guest-users.module#GuestUsersModule',
      },
    ]),
  ],
})
export class UsersModule { }
