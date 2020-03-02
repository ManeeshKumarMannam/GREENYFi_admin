import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// routing
import { AppRoutingComponents, AppRoutingModule } from './app-routing.module';

// reusable
import { SharedModule } from './reusable/shared/shared.module';

// Common
import { CanAuthActivate, CanLoginActivate } from './common/auth.gaurd';
import { Broadcaster } from './common/broadCaster';
import { CommonService } from './common/common.service';
import { ErrorMessages } from './common/errorMessages';

// plugins
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

// component
import { AppComponent } from './app.component';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    CanLoginActivate,
    CanAuthActivate,
    AppRoutingComponents,
  ],
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CanLoginActivate,
    CanAuthActivate,
    CommonService,
    BsDropdownDirective,
    ErrorMessages,
    Broadcaster,
    BsModalRef,
  ],
})
export class AppModule { }
