import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../reusable/shared/shared.module';

// Component
import { ResetPasswordComponent } from '../public/reset-password/reset-password.component';
import { SetPasswordComponent } from '../public/set-password/set-password.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(
      [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent, pathMatch: 'full' },
        { path: 'reset-password', component: ResetPasswordComponent, pathMatch: 'full' },
        {
          path: 'set-password',
          component: SetPasswordComponent,
          pathMatch: 'full',
        },
        { path: '**', redirectTo: 'login', pathMatch: 'full' },
      ],
    ),
  ],
})
export class PublicModule { }
