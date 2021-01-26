import { Injectable } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  static mensajeOK:string = "Grabado con éxito";
  static mensajeError:string = "Error en el proceso";
  static mensajeWarning:string = "Posible inconveniente en el proceso";
  static mensajeInfo:string = "Proceso ejecutado con éxito";

constructor() { }

basicSwal() {
  Swal.fire('', 'Hello world!');
}

alertHTML(title?:string, mensaje?:string){
  title = title ? title : '¡Genial!';
  mensaje = mensaje ? mensaje : MensajeService.mensajeOK;
  Swal.fire({
    title: title,
    html: mensaje,
    showCancelButton: false,
    type: 'info',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok, ¡Lo entiendo!'
  }).then((result) => {
    
  });
}

alertOK(title?:string, mensaje?:string) {
  title = title ? title : '¡Genial!';
  mensaje = mensaje ? mensaje : MensajeService.mensajeOK;
  return Swal.fire({title: title, text: mensaje, type:'success', allowOutsideClick: false});
}

alertError(title?:string, mensaje?:string) {
  title = title ? title : '¡Ups!';
  mensaje = mensaje ? mensaje : MensajeService.mensajeError;
  return Swal.fire({title: title, text: mensaje, type:'error', allowOutsideClick: false});
}

alertWarning(title?:string, mensaje?:string) {
  title = title ? title : '¡Cuidado!';
  mensaje = mensaje ? mensaje : MensajeService.mensajeWarning;
  return Swal.fire({title: title, text: mensaje, type:'warning', allowOutsideClick: false});
}

alertInfo(title?:string, mensaje?:string) {
  title = title ? title : '¡Ten en cuenta esto!';
  mensaje = mensaje ? mensaje : MensajeService.mensajeInfo;
  return Swal.fire({title: title, text: mensaje, type:'info', allowOutsideClick: false});
}

alertEpico(title?:string, mensaje?:string) {
  title = title ? title : 'Información';
  mensaje = mensaje ? mensaje : MensajeService.mensajeOK;
  return Swal.fire({
    title: title,
    text: mensaje,
    imageUrl: 'images/epico-icon.png',
    showCloseButton: true,
    allowOutsideClick: false
  });
}

confirmAlert() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this imaginary file!',
    type: 'warning',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: 'Si'
  }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Your imaginary file is safe!', 'error');
      } else {
        Swal.fire('', 'Poof! Your imaginary file has been deleted!', 'success');
      }
    });
}

promptAlert() {
  Swal.fire({
    text: 'Write something here:',
    input: 'text',
  }).then((result) => {
    if (result.value) {
      Swal.fire('', `You typed: ${result.value}`);
    }
  });
}

ajaxAlert() {
  Swal.fire({
    text: 'Submit your Github username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          );
        });
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      });
    }
  });
}
}

