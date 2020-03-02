import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../../reusable/shared/shared.module';

// components
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { CanTransactionViewsActivate } from '../../common/auth.gaurd'
@NgModule({
  declarations: [ListComponent, DetailComponent, CanTransactionViewsActivate],
  providers: [CanTransactionViewsActivate],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent, pathMatch: 'full' },

      {
        path: 'detail/:id',
        canActivate: [CanTransactionViewsActivate],
        component: DetailComponent,
        pathMatch: 'full',
      },
    ])
  ],
})
export class TransactionsModule { }
