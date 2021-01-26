import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotoPerfilComponent } from './fotoPerfil.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [FotoPerfilComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    NgbTabsetModule,
    NgbTooltipModule,
    NgbButtonsModule,
    ImageCropperModule
  ],
  exports:[FotoPerfilComponent],
  providers: []
})
export class FotoPerfilModule { }