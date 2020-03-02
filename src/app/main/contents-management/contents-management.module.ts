import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../../reusable/shared/shared.module';

// common
import { CanCmsActivate, CanHomeactActivate, CanAboutUSActivate } from '../../common/auth.gaurd';
import { AboutUsComponent } from './about-us/about-us.component';

// Component

@NgModule({
  declarations: [CanCmsActivate, CanHomeactActivate, AboutUsComponent, CanAboutUSActivate],
  providers: [CanCmsActivate, CanHomeactActivate, CanAboutUSActivate],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'home', canActivate: [CanHomeactActivate], loadChildren: 'src/app/main/contents-management/home/home.module#HomeModule', },
      {
        path: 'cms',
        canActivate: [CanCmsActivate],
        loadChildren: 'src/app/main/contents-management/cms/cms.module#CmsModule',
      },
      {
        path: 'about-us',
        canActivate: [CanAboutUSActivate],
        component: AboutUsComponent,
        pathMatch: 'full'
      },
      {
        path: 'contact-us',
        // canActivate: [CanHomeactActivate],
        loadChildren: 'src/app/main/contents-management/contact-us/contact-us.module#ContactUsModule',
      },
    ]),
  ],
})
export class ContentsManagementModule { }
