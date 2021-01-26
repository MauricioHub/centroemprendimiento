import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PersonaService } from 'src/app/servicio/Persona.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { Usuario } from 'src/app/estructuras/usuario';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { General } from 'src/app/estructuras/General';
import { UsuarioService } from 'src/app/servicio/Usuario.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-fotoPerfil',
  templateUrl: './fotoPerfil.component.html',
  styleUrls: ['./fotoPerfil.component.scss']
})
export class FotoPerfilComponent implements OnInit {

  fotoPerfil: FileUpload;
  @Input() usuario: Usuario;

  @ViewChild('fotoImagen', { static: false }) private fotoImagen;

  constructor(private usuarioService: UsuarioService, private mensajeService: MensajeService) {

  }

  ngOnInit() {
    if (!this.usuario) {
      this.usuario = Usuario.getUser();
    }
    this.croppedImage = this.usuario.url_foto;
  }

  public pictNotLoading(event) { event.target.src = 'images/user.png'; }

  chageFile(): void {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = ($event) => {
      // tslint:disable-next-line:prefer-for-of
      this.fileChangeEvent($event);
      this.fotoImagen.show();
      this.fotoPerfil = {
        data: null,
        base64: null,
        state: 'in',
        inProgress: false,
        progress: 0,
        canRetry: false,
        canCancel: true
      };
      return;
      for (let index = 0; index < fileUpload.files.length; index++) {
        let file = fileUpload.files[index];
        if (!file.type.match(fileUpload.accept)) {
          continue;
        }
        if (file.size > 5242880) {
          this.mensajeService.alertError('Error', 'El archivo no debe superar los 5 MB');
          fileUpload.value = "";
          continue;
        }
        if (fileUpload.dataset.outputName) {
          document.getElementById(fileUpload.dataset.outputName).innerHTML = file.name;
        }

        this.fotoPerfil = {
          data: file,
          state: 'in',
          inProgress: false,
          progress: 0,
          canRetry: false,
          canCancel: true
        };
        this.fotoImagen.show();
        //this.uploadFile();
      }
    };

    fileUpload.click();
  }

  uploadFile(): void {
    let formData = new FormData();
    formData.append('fotoPerfil', this.fotoPerfil.data);
    formData.append('ImagenBase', this.fotoPerfil.base64);
    console.log(this.fotoPerfil.base64);
    console.log(this.fotoPerfil);
    this.usuarioService.actualizarFotoPerfil(formData).subscribe(data => {
      if (data instanceof HttpResponse) {
        console.log(data);
        if (data.body.codigo == '0') {
          this.mensajeService.alertError(null, data.body.mensaje);
        } else {
          Usuario.setUser(data.body.data);
          this.mensajeService.alertOK(null, data.body.mensaje);
          this.usuario = Usuario.getUser();
          window.location.reload();
        }
      }
    });
  }

  getId() {
    return General.generateId();
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log("Imagen cropped");
    console.log(event);
    this.croppedImage = event.base64;
    this.fotoPerfil.base64 = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}

export class FileUpload {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  base64?:string;
  sub?: Subscription;
}
