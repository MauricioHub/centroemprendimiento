import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { FotoPerfilModule } from 'src/app/componente/fotoPerfil/fotoPerfil.module';
import { MiPerfilComponent } from './miPerfil.component';
import { PerfilModule } from 'src/app/componente/perfil/perfil.module';
import {SelectModule} from 'ng-select';

@NgModule({
    declarations: [MiPerfilComponent],
    imports: [
      CommonModule,
      SharedModule,
      NgbDropdownModule,
      NgbTooltipModule,
      NgbCarouselModule,
      LightboxModule,
      FotoPerfilModule,
      PerfilModule,
      SelectModule
    ],
    exports:[MiPerfilComponent]
  })
export class MiPerfilModule {
}
