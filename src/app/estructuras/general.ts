import { Respuesta } from './respuesta';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

export class General {

  static generateId(len?) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, this.dec2hex).join('')
  }

  private static dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2)
  }

  static respuesta: Respuesta = {
    codigo: "0",
    mensaje: "Ha ocurrido un error inesperado",
    data: null,
    mensaje_error: "Ha ocurrido un error inesperado",
  };

  public static getValidElementForm(element, isSubmit: boolean): boolean {
    if (element) {
      return !element.valid && (element.dirty || element.touched || isSubmit)
    }
    return false;
  }

  public static getValidElementFormExcluyente(element, isSubmit: boolean, disabled?): boolean {
    if (disabled) {
      element.disable();
    } else {
      element.enable();
    }
    if (element) {
      return !element.valid && (element.dirty || element.touched || isSubmit)
    }
    return false;
  }

  public static getFechaActual() {
    let dateObj = new Date();
    let yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1) + '-' + dateObj.getUTCDate();
    let fechaActual = formatDate(yearMonth, 'yyyy-MM-dd', 'en-US');
    return fechaActual;
  }

  public static getFechaActualHora() {
    let dateObj = new Date();
    let yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1) + '-' + dateObj.getUTCDate() + " " + dateObj.getHours() + ':' + dateObj.getUTCMinutes() + ":" + dateObj.getUTCSeconds();
    let fechaActual = formatDate(yearMonth, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    return fechaActual;
  }

  public static getDataOptionAlert(lista) {
    let data = {};
    lista.forEach(item => {
      data[item.id] = item.nombre;
    });
    return data;
  }

  public static loading() {
    /*let div = document.createElement('div');
    div.classList.add('bloquear');
    div.innerHTML = '<div class="loader"></div>';
    document.querySelector('body').appendChild(div);*/
    Swal.fire({
      title: 'Cargando...',
      html: '',// add html attribute if you want or remove
      allowOutsideClick: false,
      customClass:{
        popup: 'loadingAlert'
      },
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
  }

  public static closeLoading() {
    /*let loading = document.querySelector('.bloquear');
    if (loading)
      loading.remove();*/
    Swal.close();
  }
}
