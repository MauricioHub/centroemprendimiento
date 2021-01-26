import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MntAsistentesTecnicosRoutingModule } from './mnt-asistentes-tecnicos-routing.module';
import { MntAsistentesTecnicosComponent } from './mnt-asistentes-tecnicos.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TinymceModule } from 'angular2-tinymce';


@NgModule({
  declarations: [MntAsistentesTecnicosComponent],
  imports: [
    CommonModule,
    MntAsistentesTecnicosRoutingModule,
    NgbModule,
    TinymceModule,
    SharedModule,
    DataTablesModule
  ],
  providers:[
    DatePipe
  ]
})


export class MntAsistentesTecnicosModule { }


