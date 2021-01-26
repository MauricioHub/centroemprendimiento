import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ProgramaService } from 'src/app/servicio/Programa.service';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalIntroductorio',
  templateUrl: './modalIntroductorio.component.html',
  styleUrls: ['./modalIntroductorio.component.scss']
})
export class ModalIntroductorioComponent implements OnInit, AfterViewInit {

  @ViewChild('exampleModalCenter', { static: false }) private exampleModalCenter;

  constructor(private programaService: ProgramaService
    //, private modalService: NgbModal
    ) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void{
  }

  actualizar(){
    this.programaService.actividad_selecionada.estado_actividad_inscripcion="EP";
    this.programaService.actualizar_actividad().subscribe(data=>{
      if(data.codigo == '1'){
        window.location.reload();
      }
    });
  }
}
