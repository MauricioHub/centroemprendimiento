import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsignarActividadComponent } from './asignarActividad.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
/**
 * Module
 */
@NgModule({
    imports: [
        CommonModule, FormsModule,TreeViewModule
    ],
    declarations: [AsignarActividadComponent],
    bootstrap:[AsignarActividadComponent],
    exports: [AsignarActividadComponent]
})
export class AsignarActividadModule {
}
