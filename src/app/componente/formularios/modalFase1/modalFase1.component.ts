import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalFase1',
  templateUrl: './modalFase1.component.html',
  styleUrls: ['./modalFase1.component.scss']
})
export class ModalFase1Component implements OnInit, AfterViewInit {

  bloque=1;
  @ViewChild('videoIntro') videoplayer: ElementRef;

  @ViewChild('pilares1') resp1: ElementRef;
  @ViewChild('emprensa_r2') resp2: ElementRef;
  @ViewChild('clave_éxito3') resp3: ElementRef;
  @ViewChild('caracteristica4') resp4: ElementRef;
  @ViewChild('diferenciar_emp3') resp5: ElementRef;
  @ViewChild('exampleModalCenter', { static: false }) private exampleModalCenter;

  constructor( private programaService: ProgramaService, private mensajeService: MensajeService) { }

  ngOnInit() {
    this.habilitarBotones();
    this.playVide();
  }

  ngAfterViewInit(){
    //this.exampleModalCenter.show();
    this.playVide();
  }

  validarPreguntas():void{
    /*let mensaje="";
    if(!this.resp1.nativeElement.checked){
      mensaje += "<li>La pregunta 1 es incorrecta</li>";
    }
    //if(!$("#emprensa_r2").is(':checked')) {  
    if(!this.resp2.nativeElement.checked){
      mensaje += "<li>La pregunta 2 es incorrecta</li>";
    }
    //if(!$("#clave_éxito3").is(':checked')) {  
    if(!this.resp3.nativeElement.checked){
      mensaje += "<li>La pregunta 3 es incorrecta</li>";
    }
    //if(!$("#caracteristica4").is(':checked')) {  
    if(!this.resp4.nativeElement.checked){
      mensaje += "<li>La pregunta 4 es incorrecta</li>";
    }
    //if(!$("#diferenciar_emp3").is(':checked')) {  
    if(!this.resp5.nativeElement.checked){
      mensaje += "<li>La pregunta 5 es incorrecta</li>";
    }
    if(mensaje != ''){
      mensaje = '<ul>' + mensaje + '</ul>';
      Swal.fire({
        title: "Error",
        html: mensaje,
        showCancelButton: false,
        type: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        
      });
      return;
    }*/
    this.programaService.finalizar_actividad().subscribe();
  }

  habilitarBotones():void{
    switch(this.bloque){
      case 1: 
        document.getElementById("btn-listo").style.display="block"; 
        document.getElementById("btn-atras").style.display="none"; 
        document.getElementById("btn-finalizar").style.display="none"; 
        break;
      /*case 2: 
        document.getElementById("btn-listo").style.display="block"; 
        document.getElementById("btn-atras").style.display="block";
        document.getElementById("btn-finalizar").style.display="none";  
        break;*/
      case 2: 
        document.getElementById("btn-listo").style.display="none"; 
        document.getElementById("btn-atras").style.display="block";
        document.getElementById("btn-finalizar").style.display="block";  
        break;
    }
  }

  pasar():void{
    document.getElementById("bloque"+this.bloque).style.display="none";
    this.bloque++;
    document.getElementById("bloque"+this.bloque).style.display="block";
    this.playVide();
    this.habilitarBotones();
  }

  atras():void{
    document.getElementById("bloque"+this.bloque).style.display="none";
    this.bloque--;
    document.getElementById("bloque"+this.bloque).style.display="block";
    this.playVide();
    this.habilitarBotones();
  }

  playVide():void{
    if(this.bloque == 2){
      $('#videoIntro').html('<iframe style="width: 100%; height: 350px" id="videoIntro" src="https://www.youtube.com/embed/zaPAg7QDisE?&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    }else{
      $('#videoIntro').html('');
    }
    return;
    if(this.bloque == 2){
      this.videoplayer.nativeElement.play();
    }else{
      this.videoplayer.nativeElement.pause();
    }
  }
}
