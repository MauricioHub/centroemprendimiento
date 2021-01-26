import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAdminRoutes } from './dashboardAdmin.routing';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { DashboardAdminComponent } from './dashboardAdmin.component';
import {AngularHighchartsChartModule} from 'angular-highcharts-chart';
import {NgbProgressbarModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {TablaActividadesDSModule} from '../componentes/tablaActividadesDS/tablaActividadesDS.module'
import { PivotModule } from '../pivot/pivot.module';

@NgModule({
  declarations: [DashboardAdminComponent],
  imports: [
    CommonModule,
    DashboardAdminRoutes,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule,
    LightboxModule,
    AngularHighchartsChartModule,
    NgbProgressbarModule,
    NgbTabsetModule,
    TablaActividadesDSModule,
    PivotModule
  ],
  exports:[DashboardAdminComponent]
})
export class DashboardAdminModule { }
