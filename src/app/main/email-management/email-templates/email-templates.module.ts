import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../../../reusable/shared/shared.module';

// common
import { CanCreateEmailTemplateActivate, CanEditEmailTemplateActivate } from '../../../common/auth.gaurd';

// Component
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent, DetailsComponent, CanEditEmailTemplateActivate, CanCreateEmailTemplateActivate],
  providers: [CanEditEmailTemplateActivate, CanCreateEmailTemplateActivate],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent, pathMatch: 'full' },
      {
        path: 'detail',
        // canActivate: [CanCreateEmailTemplateActivate],
        component: DetailsComponent,
        pathMatch: 'full',
      },
      {
        path: 'detail/:id',
        // canActivate: [CanEditEmailTemplateActivate],
        component: DetailsComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class EmailTemplatesModule { }
