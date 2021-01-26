
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { MntEtapaEditComponent } from './mntEtapaEdit.component';
import { ArchivoModule } from 'src/app/componente/archivo/archivo.module';

@NgModule({
  declarations: [MntEtapaEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    ArchivoModule
  ],
  exports:[MntEtapaEditComponent]
})
export class MntEtapaEditModule {
}
