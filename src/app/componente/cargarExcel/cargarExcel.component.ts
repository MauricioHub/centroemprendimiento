import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargarExcel',
  templateUrl: './cargarExcel.component.html',
  styleUrls: ['./cargarExcel.component.scss']
})
export class CargarExcelComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() archivoReferencia = "";
  @Input() title="Subir archivo";

  @Output() getFile=new EventEmitter<any>();
  @Output() getData=new EventEmitter<any>();
  @Output() grabar=new EventEmitter<any>();

  _file;
  arrayBuffer;
  listaDatos;

  camposLista: Array<any>;

  constructor() { }

  ngOnInit() {
  }

  guardar() {
    this.camposLista.forEach(element=>{
      element.statusTrasaction = 'EP';
      element.error = null;
    });
    this.grabar.emit({file:this._file, data:this.listaDatos});
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  verRegistros(event) {
    this._file = event;
    this.getFile.emit(this._file);
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this._file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.listaDatos = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.camposLista=[];
      for (let campo in this.listaDatos[0]) {
        this.camposLista.push({name: campo, attr:campo});
      }
      this.camposLista.forEach(element=>{
        element.statusTrasaction = 'PE';
        element.isCollapsed = true;
        element.error = null;
      });
      this.getData.emit(this.listaDatos);
    }
  }

  getError(item){
    return JSON.stringify(item.error);
  }

}
