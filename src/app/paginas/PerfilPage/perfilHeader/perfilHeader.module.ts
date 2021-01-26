import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PerfilHeaderComponent } from './perfilHeader.component';
import { FotoPerfilModule } from 'src/app/componente/fotoPerfil/fotoPerfil.module';

@NgModule({
  declarations: [PerfilHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    FotoPerfilModule
  ],
  exports:[PerfilHeaderComponent]
})
export class PerfilHeaderModule { }
