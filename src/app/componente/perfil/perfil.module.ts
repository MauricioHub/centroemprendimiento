import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import { PerfilComponent } from './perfil.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FotoPerfilModule} from 'src/app/componente/fotoPerfil/fotoPerfil.module';

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FotoPerfilModule
  ],
  exports:[PerfilComponent, FotoPerfilModule],
  providers: []
})
export class PerfilModule { }