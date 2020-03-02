import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../../reusable/shared/shared.module';

// common
import { CanAdminEmailActivate, CanEmailTemplateActivate, CanSMTPinActivate } from '../../common/auth.gaurd';

// Component
import { AdminEmailsComponent } from './admin-emails/admin-emails.component';
import { SmtpSettingComponent } from './smtp-setting/smtp-setting.component';

@NgModule({
  declarations: [AdminEmailsComponent, SmtpSettingComponent, CanAdminEmailActivate, CanEmailTemplateActivate, CanSMTPinActivate],
  providers: [CanAdminEmailActivate, CanEmailTemplateActivate, CanSMTPinActivate],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'admin-email', pathMatch: 'full' },
      {
        path: 'admin-email',
        canActivate: [CanAdminEmailActivate],
        component: AdminEmailsComponent,
        pathMatch: 'full',
      },
      {
        path: 'email-template',
        canActivate: [CanEmailTemplateActivate],
        loadChildren: 'src/app/main/email-management/email-templates/email-templates.module#EmailTemplatesModule',
      },
      { path: 'smtp-setting', canActivate: [CanSMTPinActivate], component: SmtpSettingComponent, pathMatch: 'full' },
    ]),
  ],
})
export class EmailManagementModule { }
