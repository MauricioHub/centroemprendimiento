import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CargarExcelComponent } from './cargarExcel.component';
import { ArchivoModule } from '../archivo/archivo.module';
import {DataTablesModule} from 'angular-datatables';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CargarExcelComponent],
  imports: [
    CommonModule,
    SharedModule,
    ArchivoModule,
    DataTablesModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  exports:[CargarExcelComponent]
})
export class CargarExcelModule { }