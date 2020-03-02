import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../../../../reusable/shared/shared.module';

// Components
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent, pathMatch: 'full' },
      {
        path: 'detail',
        // canActivate: [CanCreateEmailTemplateActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'detail/:id',
        // canActivate: [CanEditEmailTemplateActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class FaqModule { }
