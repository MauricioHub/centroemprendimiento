import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { Etapa } from 'src/app/estructuras/etapa';
import { HttpResponse } from '@angular/common/http';
import { MntProgramaService } from 'src/app/servicio/mantenimiento/MntPrograma.service';

@Component({
  selector: 'app-mntEtapaEdit',
  templateUrl: './mntEtapaEdit.component.html',
  styleUrls: ['./mntEtapaEdit.component.css']
})
export class MntEtapaEditComponent implements OnInit {

  @Input() idSubPrograma;
  @Input() idPrograma;
  @Input() etapa: Etapa;
  @Input() listaProgramas;
  listaSubPrograma;

  @Output() cancelar=new EventEmitter<any>();

  logoFile;
  bannerFile;
  archivoFile;
  iconoFile;

  editarCabecera=false;

  constructor(private catalogoService: CatalogoService, 
    private mensajeService: MensajeService, 
    private mntProgramaService: MntProgramaService) { }

  ngOnInit() {
    this.catalogoService.getListaPrograma().subscribe(data => {
      if (data.codigo == '1') {
        this.listaProgramas = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de programa');
      }
    });
    if(!this.etapa){
      this.etapa = {
        id:null,
        id_sub_programa:this.idSubPrograma,
        nombre:null,
        etapa:null,
        estado:null,
        icono:null,
        logo:null,
        banner:null,
        plan_trabajo:null,
        inicio:null,
        fin:null,
        orden:null,
        antecesor:null,
        predecesor:null,
        img1:null
      };
    }
    this.consultarSubProgramas();
    if(this.etapa.id){
      this.editarCabecera=false;
    }else{
      this.editarCabecera=true;
    }
  }

  consultarSubProgramas() {
    this.catalogoService.getListaSubPrograma(this.etapa.id_sub_programa).subscribe(data => {
      if (data.codigo == '1') {
        this.listaSubPrograma = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de sub programa');
      }
    });
  }

  _cancelar(){
    this.cancelar.emit();
  }

  grabar(){
    let formData = new FormData();
    formData.append('datos', JSON.stringify(this.etapa));
    formData.append('logoFile', this.logoFile);
    formData.append('iconoFile', this.iconoFile);
    formData.append('bannerFile', this.bannerFile);
    formData.append('archivoFile', this.archivoFile);
    this.mntProgramaService.grabarEtapa(formData).subscribe(data=>{
      if (data instanceof HttpResponse) {
        if(data.body.codigo=='0'){
          this.mensajeService.alertError(null,data.body.mensaje);
        }else{
          this.mensajeService.alertOK(null,data.body.mensaje);
          window.location.reload();
        }
      }
    });
  }
}
