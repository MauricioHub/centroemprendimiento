import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HdCustomerRoutingModule } from './hd-customer-routing.module';
import { HdCustomerComponent } from './hd-customer.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TinymceModule} from 'angular2-tinymce';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HdCustomerComponent],
  imports: [
    CommonModule,
    HdCustomerRoutingModule,
    SharedModule,
    NgbModule,
    TinymceModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class HdCustomerModule { }
