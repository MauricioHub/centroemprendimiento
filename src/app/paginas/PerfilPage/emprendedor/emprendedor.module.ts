import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmprendedorRouterModule } from './emprendedor.routing';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { PerfilModule} from 'src/app/componente/perfil/perfil.module';
import { FullCalendarModule } from '@fullcalendar/angular'
import { EmprendedorComponent } from './emprendedor.component';
import { ComponentAppModule } from 'src/app/componente/componentApp.module';
import { PerfilHeaderModule } from '../perfilHeader/perfilHeader.module';
import { CalendarioModule } from 'src/app/componente/calendario/calendario.module';
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [EmprendedorComponent],
  imports: [
    CommonModule,
    EmprendedorRouterModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule,
    LightboxModule,
    PerfilModule,
    FullCalendarModule,
    ComponentAppModule,
    PerfilHeaderModule,
    CalendarioModule,
    NgbTabsetModule
  ],
  exports:[EmprendedorComponent]
})
export class EmprendedorModule { }
