import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule, CollapseModule, ModalModule, PaginationModule, SortableModule } from 'ngx-bootstrap';
import { SafePipe, SearchFilter, SortableColumnComponent, SortableTableDirective, SortPipe, LimitTextPipe } from './bn-datatable.component';
import { SortService } from './sortService';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    SortableModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    NgSelectModule,
  ],
  declarations: [
    SortableColumnComponent,
    SortableTableDirective,
    SortPipe,
    SearchFilter,
    SafePipe,
    LimitTextPipe

  ],
  providers: [
    SortService,
  ],
  exports: [
    SortableColumnComponent,
    SortableTableDirective,
    SortPipe,
    SearchFilter,
    CommonModule,
    PaginationModule,
    BsDropdownModule,
    CollapseModule,
    ModalModule,
    SortableModule,
    NgSelectModule,
    SafePipe,
    LimitTextPipe
  ],
})
export class BnDatatableModule { }
