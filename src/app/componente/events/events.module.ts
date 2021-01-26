import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EventsComponent } from './events.component';
import {TinymceModule} from 'angular2-tinymce';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TinymceModule,
    DataTablesModule
  ],
  exports:[EventsComponent]
})
export class EventsModule { }
