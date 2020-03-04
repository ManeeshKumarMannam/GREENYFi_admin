import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../reusable/shared/shared.module';

// plugin
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

// common
import { CanAuthActivateChild, CanManageRoleActivate, CanTransactionsActivate, CanSettinginActivate } from '../common/auth.gaurd';

// Component
import { SidebarComponent } from '../reusable/sidebar/sidebar.component';
import { HeaderComponent } from './../reusable/header/header.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    ChangePasswordComponent,
    MyProfileComponent,
    CanManageRoleActivate,
    CanTransactionsActivate,
    CanSettinginActivate,
    CanAuthActivateChild],
  imports: [
    BsDropdownModule.forRoot(),
    SharedModule,
    CommonModule,
    ModalModule,
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: MainComponent,
          canActivateChild: [CanAuthActivateChild],
          children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
            {
              path: 'users',
              loadChildren: 'src/app/main/users/users.module#UsersModule',
            },
            {
              path: 'reported-issues-list',
              loadChildren: 'src/app/main/reported-issues/reported-issues.module#ReportedIssuesModule',
            },
            {
              path: 'contents-management',
              loadChildren: 'src/app/main/contents-management/contents-management.module#ContentsManagementModule',
            },
            {
              path: 'email-management',
              loadChildren: 'src/app/main/email-management/email-management.module#EmailManagementModule',
            },
            {
              path: 'master-management',
              // canActivate:[CanCharitytActivate],
              loadChildren: 'src/app/main/master-management/master-management.module#MasterManagementModule',
            },
            {
              path: 'manage-roles',
              canActivate: [CanManageRoleActivate],
              loadChildren: 'src/app/main/manage-roles/manage-roles.module#ManageRolesModule',
            },
            {
              path: 'transactions',
              canActivate: [CanTransactionsActivate],
              loadChildren: 'src/app/main/transactions/transactions.module#TransactionsModule',
            },
            {
              path: 'settings',
              canActivate: [CanSettinginActivate],
              loadChildren: 'src/app/main/settings/settings.module#SettingsModule',
            },
            { path: 'my-profile', component: MyProfileComponent, pathMatch: 'full' },
            { path: 'change-password', component: ChangePasswordComponent, pathMatch: 'full' },
            { path: '**', redirectTo: 'main/dashboard', pathMatch: 'full' },
          ],
        },
      ],
    ),
  ],
  providers: [
    BsDropdownModule,
    CanManageRoleActivate,
    CanAuthActivateChild,
    CanTransactionsActivate,
    CanSettinginActivate
  ],
  entryComponents: [],
})
export class MainModule { }
