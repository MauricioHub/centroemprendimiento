import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TablaActividadesDSComponent } from './tablaActividadesDS.component';

@NgModule({
  declarations: [TablaActividadesDSComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule
  ],
  exports:[TablaActividadesDSComponent]
})
export class TablaActividadesDSModule { }