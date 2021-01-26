import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropTreeComponent } from './dragDropTree.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
/**
 * Module
 */
@NgModule({
    imports: [
        CommonModule, FormsModule,TreeViewModule
    ],
    declarations: [DragDropTreeComponent],
    bootstrap:[DragDropTreeComponent],
    exports: [DragDropTreeComponent]
})
export class DraDropTreeModule {
}
