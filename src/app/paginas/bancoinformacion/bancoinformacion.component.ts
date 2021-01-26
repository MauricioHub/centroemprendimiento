import { Component, OnInit } from '@angular/core';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
@Component({
  selector: 'app-bancoinformacion',
  templateUrl: './bancoinformacion.component.html',
  styleUrls: ['./bancoinformacion.component.scss']
})
export class BancoinformacionComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;
  mostrar= false;
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  constructor(private toastyService: ToastyService) { }

  ngOnInit() {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
  }

  mostrarPregEmprendedor(){
    this.mostrar=!this.mostrar;
  }
  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    console.log("entrotoast");
    this.position = options.position ? options.position : this.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }

}
