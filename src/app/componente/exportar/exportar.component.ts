import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ExportService } from 'src/app/servicio/export.service';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.scss']
})
export class ExportarComponent implements OnInit {

  @Input() lista = [];
  @Input() title = "descarga";

  @ViewChild('camposModal', { static: false }) private camposModal;

  todos=true;
  camposDinamicos=true;
  @Input() campos:campo[]=[];

  constructor(private exportService: ExportService) { }

  ngOnInit() {
    if(this.campos.length>0){
      this.camposDinamicos = false;
      this.campos.sort((a, b) => (a.campo < b.campo ? -1 : 1));
    }
  }

  getCampos(){
    if(this.camposDinamicos){
      this.todos=true;
      this.campos = [];
      if(this.lista.length > 0){
        for (let campo in this.lista[0]) {
          this.campos.push({campo: campo, selected:true});
        }
        this.campos.sort((a, b) => (a.campo < b.campo ? -1 : 1));
      }
    }
  }

  descargar(){
    this.getCampos();
    this.camposModal.show();
  }

  _descargar(){
    if(this.todos){
      this.exportService.exportAsExcelFile(this.lista, this.title); 
    }else{
      let listaNueva = [];
      this.lista.forEach(element => {
        let item = {};
        this.campos.forEach(campo => {
          if(campo.selected)
            item[campo.campo]=element[campo.campo];
        });
        listaNueva.push(item);
      });
      this.exportService.exportAsExcelFile(listaNueva, this.title); 
    }
  }

  select(){
    const descAllSelected = this.campos.length > 0 && this.campos.every(child => {
      return child.selected;
    });
    this.todos = descAllSelected;
  }

  selectAll(){
    this.campos.forEach(element => {
      element.selected = this.todos;
    });
  }
}

export interface campo{
  campo: string;
  selected: boolean;
}
