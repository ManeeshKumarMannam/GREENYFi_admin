import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// reusable
import { SharedModule } from '../../../reusable/shared/shared.module';

// common
import { CanCreateCmsActivate, CanEditCmsActivate } from '../../../common/auth.gaurd';

// Component
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

@NgModule({
    declarations: [ListComponent, DetailComponent],
    providers: [],
    imports: [
        SharedModule,
        CommonModule,
        RouterModule.forChild([
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListComponent, pathMatch: 'full' },
            {
                path: 'addNewHome',
                // canActivate: [CanCreateCmsActivate],
                component: DetailComponent,
                pathMatch: 'full',
            },
            {
                path: 'detail/:id',
                // canActivate: [CanEditCmsActivate],
                component: DetailComponent,
                pathMatch: 'full',
            },
        ]),
    ],
})
export class HomeModule { }
