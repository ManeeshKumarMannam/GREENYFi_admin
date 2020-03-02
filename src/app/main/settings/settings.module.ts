import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// resuable
import { SharedModule } from '../../reusable/shared/shared.module';

// Component
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
import { NotificationComponent } from './notification/notification.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { CharitiesCommonContentComponent } from './charities-common-content/charities-common-content.component';

@NgModule({
  declarations: [GlobalSettingsComponent, PaymentGatewayComponent, NotificationComponent, CharitiesCommonContentComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'global-settings', pathMatch: 'full' },
      { path: 'global-settings', component: GlobalSettingsComponent, pathMatch: 'full' },
      { path: 'payment-gateway', component: PaymentGatewayComponent, pathMatch: 'full' },
      { path: 'notification', component: NotificationComponent, pathMatch: 'full' },
      { path: 'charities-common-content', component: CharitiesCommonContentComponent, pathMatch: 'full' },
    ]),
  ],
})
export class SettingsModule { }
