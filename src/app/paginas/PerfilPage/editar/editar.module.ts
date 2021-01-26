import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarRoutingRoutes } from './editar.routing';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FotoPerfilModule } from 'src/app/componente/fotoPerfil/fotoPerfil.module';
import { EditarComponent } from './editar.component';
import { PerfilModule } from 'src/app/componente/perfil/perfil.module';
import { DatosPersonalesModule } from './datosPersonales/datosPersonales.module';
import { ContactoModule } from './contacto/contacto.module';
import { MiPerfilModule } from './miPerfil/miPerfil.module';

@NgModule({
    declarations: [EditarComponent],
    imports: [
      CommonModule,
      EditarRoutingRoutes,
      SharedModule,
      FotoPerfilModule,
      PerfilModule,
      DatosPersonalesModule,
      ContactoModule,
      MiPerfilModule
    ],
    exports:[EditarComponent]
  })
export class EditarModule {
}
