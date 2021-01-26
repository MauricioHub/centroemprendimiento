import { Component, OnInit, Input } from '@angular/core';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';


@Component({
  selector: 'app-subirArchivo',
  templateUrl: './subirArchivo.component.html',
  styleUrls: ['./subirArchivo.component.scss']
})
export class SubirArchivoComponent implements OnInit {
  accept;
  maxSize;
  file;
  subirArchivo = true;

  archivoReferencia;
  archivoCargado;

  constructor(private programaService: ProgramaService, private mensajeService: MensajeService) {
  }

  ngOnInit() {
    this.accept = this.programaService.actividad_selecionada.mimetype;
    this.maxSize = this.programaService.actividad_selecionada.size_max * 1024 * 1024;
    this.subirArchivo = this.programaService.actividad_selecionada.estado_actividad_inscripcion != 'AP';
    this.archivoReferencia = this.programaService.actividad_selecionada.url_archivo_actividad;
    this.archivoCargado = this.programaService.actividad_selecionada.url_archivo;
    //this.filesControl = new FormControl(null, [FileUploadValidators.filesLimit(1), FileUploadValidators.fileSize(this.maxSize)]);
    this.filesControl = new FormControl(null, [FileUploadValidators.filesLimit(1), FileUploadValidators.fileSize(this.maxSize)]);
    this.subirArchivo ? this.filesControl.enable() : this.filesControl.disable();
    this.demoForm = new FormGroup({
      files: this.filesControl
    });
  }

  finalizar() {
    if(this.uploadedFiles.length == 0){
      this.mensajeService.alertError(null, 'Debes adjuntar tu tarea');
      return;
    }
    this.programaService.actividad_selecionada.estado_actividad_inscripcion = 'AP';
    let formData = new FormData();
    formData.append('datos', JSON.stringify(this.programaService.actividad_selecionada));
    formData.append('archivo', this.uploadedFiles[0]);
    this.programaService.actualizarActividadForm(formData).subscribe(data => {
      if (data instanceof HttpResponse) {
        if (data.body.codigo == '0') {
          this.mensajeService.alertError(null, data.body.mensaje);
        } else {
          this.mensajeService.alertEpico('¡Felicitaciones!', 'Tu actividad fue culminada con éxito').then((result) => {
            if (result.value) {
              window.location.reload();
            }
          });
        }
      }
    });
  }

  cambio(file){
    console.log(file);
  }

  public uploadedFiles: Array<File> = [];

  public animation: boolean = false;
  public multiple: boolean = false;

  public demoForm;

  filesControl;

}
