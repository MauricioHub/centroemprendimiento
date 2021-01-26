import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DragAndDropEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
    selector: 'app-asignarActividad',
    templateUrl: './asignarActividad.component.html',
    styleUrls: ['./asignarActividad.component.scss']
})
export class AsignarActividadComponent implements OnInit {
    public field;

    constructor() {
    }

    @Input() listaActividad: Object[];
    @Output() getData = new EventEmitter<any>();
    // maps the appropriate column to fields property
    public allowDragAndDrop: boolean = true;
    allowMultiSelection = true;

    public nodeDrag(args: DragAndDropEventArgs): void {
        if (args.droppedNodeData) {
            if (args.droppedNodeData.parentID) {
                if (parseInt(args.droppedNodeData.parentID.toString()) > 0) {
                    args.dropIndicator = 'e-no-drop';
                }
            } else {
                if (parseInt(args.droppedNodeData.id.toString()) > 0) {
                    args.dropIndicator = 'e-no-drop';
                }
            }
        }
    }

    public dragStop(args: DragAndDropEventArgs): void {
        args.cancel = this.validaDrag(args);
    }

    validaDrag(args: DragAndDropEventArgs) {
        let novalido = true;
        if (args.droppedNodeData) {
            let parentDragID = 1;
            let parentDropID = 1;
            let dragID = 1;
            let dropID = 1;
            dragID = parseInt(args.draggedNodeData.id.toString());
            dropID = parseInt(args.droppedNodeData.id.toString());
            if (args.draggedNodeData.parentID) {
                parentDragID = parseInt(args.draggedNodeData.parentID.toString());
            }
            if (args.droppedNodeData.parentID) {
                parentDropID = parseInt(args.droppedNodeData.parentID.toString());
            }
            if (dropID == 0 && parentDragID <= 0) {
                novalido = false;
            }
            if (parentDragID <= 0 && parentDropID == 0) {
                novalido = false;
            }
            if (parentDragID == 0 && parentDropID < 0) {
                novalido = false;
            }
            if (dropID < 0 && parentDragID == 0) {
                novalido = false;
            }
            if (args.dropLevel != 2) {
                novalido = true;
            }
        }
        return novalido;
    }

    ngOnInit() {
        this.field = { dataSource: this.listaActividad, 
            id: 'id_actividad_inscripcion', 
            parentID: 'id_actividad_padre', 
            text: 'actividad', 
            hasChildren: 'is_padre',
            selected: 'isSelected' };
    }

    changeDataSource(respuesta) {
        this.getData.emit(respuesta);
    }

}
