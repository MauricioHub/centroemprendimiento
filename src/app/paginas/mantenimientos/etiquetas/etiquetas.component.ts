import { Component, OnInit } from '@angular/core';
import { Mantenimiento } from 'src/app/interfaces/Mantenimiento';

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.scss']
})
export class EtiquetasComponent extends Mantenimiento implements OnInit {

  tabla="etiqueta"
  campos=["etiqueta","estado","color","tipo"];
  camposLista=[{attr:"id", name:"Id"}, {attr:"etiqueta", name:"Etiqueta"}, {attr:"color", name:"Color"}, {attr:"tipo", name:"Tipo"}];

  constructor() {
    super();
   }

  ngOnInit() {
  }

  setLista(lista){
    lista.forEach(element => {
      element.nombre = element.etiqueta;
    });
  }

  setData(registro){
    this.registro=registro;
    this.registro.etiqueta=registro.nombre;
  }

  grabar(etiqueta){
    
  }

  eliminar(etiqueta){
    
  }
}
