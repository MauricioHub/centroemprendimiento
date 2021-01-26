import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { RedEmprendedoresComponent } from './redEmprendedores.component';

@NgModule({
  declarations: [RedEmprendedoresComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule,
    LightboxModule
  ],
  exports:[RedEmprendedoresComponent]
})
export class RedEmprendedoresModule { }
