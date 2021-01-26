
import {BancoinformacionComponent} from "./bancoinformacion.component";
import {BancoinformacionRoutingModule} from "./bancoinformacion-routing.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/theme/shared/shared.module';
import {NgbAccordionModule, NgbCollapseModule,NgbModule,NgbButtonsModule, NgbDropdownModule, NgbTooltipModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {TinymceModule} from 'angular2-tinymce';
import {ToastyModule} from 'ng2-toasty';
import { ChatbotModule } from '../chatbot/Chatbot.module';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@NgModule({
    declarations: [BancoinformacionComponent],
    imports: [
     BancoinformacionRoutingModule,
     SharedModule,
     NgbAccordionModule,
     NgbCollapseModule,
     CommonModule,
     TinymceModule,
     NgbModule,
     NgbDropdownModule,
     NgbButtonsModule,
     NgbTooltipModule,
     ToastyModule.forRoot(),
     NgbPopoverModule,
     ChatbotModule
    
    ],
    exports:[BancoinformacionComponent]
    
  })

export class BancoinformacionModule { }