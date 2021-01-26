import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HdCustomerListRoutingModule } from './hd-customer-list-routing.module';
import { HdCustomerListComponent } from './hd-customer-list.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TinymceModule } from 'angular2-tinymce';

@NgModule({
  declarations: [HdCustomerListComponent],
  imports: [
    CommonModule,
    HdCustomerListRoutingModule,
    SharedModule,
    NgbModule,
    TinymceModule
  ],
  providers: [
    DatePipe
  ]
})
export class HdCustomerListModule { }
