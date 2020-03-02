import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatPaginatorModule, MatSlideToggleModule, MatTooltipModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

// plugin
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule, ModalModule, PaginationModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RatingModule } from "ngx-rating";
// common
import { BnDatatableModule } from '../../common/bn-datatable/bn-datatable.module';
import { BaseComponent } from '../../common/commonComponent';

// Component
import { GrapesJSComponent } from '../../reusable/grapes-js/grapes-js.component';
import { PasswordComponent } from '../../reusable/password/password.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { ResponsiveDataTableComponent } from '../responsive-data-table/responsive-data-table.component';
import { SubHeaderComponent } from '../sub-header/sub-header.component';

@NgModule({
  imports: [
    TooltipModule.forRoot(),
    NgxFileDropModule,
    MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    NgSelectModule,
    SweetAlert2Module.forRoot(),
    TabsModule.forRoot(),
    MalihuScrollbarModule.forRoot(),
    BnDatatableModule,
    LoadingBarHttpClientModule,
    PaginationModule.forRoot(),
    ImageCropperModule,
    MatTooltipModule,
    DataTablesModule,

  ],
  declarations: [
    PasswordComponent,
    BaseComponent,
    SubHeaderComponent,
    DataTableComponent,
    ResponsiveDataTableComponent,
    GrapesJSComponent,

  ],
  providers: [],
  exports: [
    NgxFileDropModule,
    MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule,
    BsDatepickerModule,
    TabsModule,
    HttpClientXsrfModule,
    NgxSpinnerModule,
    RatingModule,
    ModalModule,
    FormsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    NgSelectModule,
    SweetAlert2Module,
    MalihuScrollbarModule,
    BnDatatableModule,
    LoadingBarHttpClientModule,
    PaginationModule,
    ImageCropperModule,
    // ChartModule,
    MatTooltipModule,
    SubHeaderComponent,
    DataTableComponent,
    ResponsiveDataTableComponent,
    GrapesJSComponent,
    PasswordComponent,
  ],
})
export class SharedModule { }
