import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubirArchivoComponent } from './subirArchivo.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ArchivoModule } from '../../archivo/archivo.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';



@NgModule({
  declarations: [SubirArchivoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ArchivoModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule

  ],
  exports:[SubirArchivoComponent],
  providers: []
})
export class SubirArchivoModule { }