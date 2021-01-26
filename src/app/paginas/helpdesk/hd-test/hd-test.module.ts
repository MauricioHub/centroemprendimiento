import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HdTestRoutingModule } from './hd-test-routing.module';
import { HdTestComponent } from './hd-test.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {TinymceModule} from 'angular2-tinymce';

@NgModule({
  declarations: [HdTestComponent],
  imports: [
    CommonModule,
    HdTestRoutingModule,
    SharedModule,
    TinymceModule
  ]
})
export class HdTestModule { }