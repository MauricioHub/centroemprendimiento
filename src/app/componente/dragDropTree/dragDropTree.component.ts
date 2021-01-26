import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dragDropTree',
  templateUrl: './dragDropTree.component.html',
  styleUrls: ['./dragDropTree.component.css']
})
export class DragDropTreeComponent implements OnInit {

  @Input() data;
  @Output() getData = new EventEmitter<any>();

  ngOnInit() {
    this.field = { 
      dataSource: this.data, 
      id: 'id', 
      parentID: 'pid', 
      text: 'nombre', 
      hasChildren: 'hasChild', 
      selected: 'isSelected' };
  }

  constructor() {
  }
  // maps the appropriate column to fields property
  public field: Object;
  // set the Multi Selection option to TreeView
  public allowMultiSelection: boolean = true;
  public allowDragAndDrop: boolean = true;

  changeDataSource(respuesta){
    this.getData.emit(respuesta);
  }

}
