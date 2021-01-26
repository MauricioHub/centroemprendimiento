import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tablaActividad',
  templateUrl: './tablaActividad.component.html',
  styleUrls: ['./tablaActividad.component.scss']
})
export class TablaActividadComponent implements OnInit, AfterViewInit {

  @Input() lista;
  @Output() selectActividad=new EventEmitter();
  @Output() selectTodos=new EventEmitter();
  @Output() aprobarActividad=new EventEmitter();
  @Output() revertir=new EventEmitter();

  @Input() _selectTodos=false;

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    
  }

  _ejecutar_actividad(act){
    this.selectActividad.emit(act);
  }

  selectAll(lista?, _selectTodos?) {
    if(!lista){
      lista = this.lista;
    }
    if(typeof _selectTodos == 'undefined'){
      _selectTodos = this._selectTodos;
    }
    let self = this;
    lista.forEach(function(act){
      act.selected = _selectTodos;
      self.selectAll(act.child, act.selected);
    });
  }

  selectOne(act){
    this.selectAll(act.child, act.selected);
    if(!act.selected){
      this._selectTodos = false;
    }else{
      let self = this;
      this._selectTodos = true;
      this.lista.forEach(function(act){
        if(!act.selected)
          self._selectTodos = false;
      });
    }
    this.selectTodos.emit(this._selectTodos);
  }

  selectOne2(act){
    if(!act.selected){
      this._selectTodos = false;
    }else{
      let self = this;
      this._selectTodos = true;
      this.lista.forEach(function(act){
        if(!act.selected)
          self._selectTodos = false;
      });
    }
  }

  _aprobarActividad(act){
    act.selected = true;
    //this.selectOne(act);
    this.aprobarActividad.emit(act);
  }

  _revertir(act){
    act.selected = true;
    //this.selectOne(act);
    this.revertir.emit(act);
  }
}
