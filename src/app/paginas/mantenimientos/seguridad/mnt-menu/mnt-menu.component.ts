import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SeguridadService } from 'src/app/servicio/mantenimiento/Seguridad.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Menu } from 'src/app/interfaces/Menu';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-mnt-menu',
  templateUrl: './mnt-menu.component.html',
  styleUrls: ['./mnt-menu.component.scss']
})
export class MntMenuComponent implements AfterViewInit, OnDestroy, OnInit {

  nombre: string = "";
  estado: string = "T";
  listaMenu: Menu[];
  listaAplicaciones: any[] = [];
  @ViewChild('menuModal', { static: false }) private menuModal;
  menu: Menu = { nombre: '', orden: 0, id_aplicacion: 0 };

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(private seguridadService: SeguridadService, private mensajeService: MensajeService, private catalogoService: CatalogoService) { }

  ngOnInit() {
    this.consultarMenu();
    this.catalogoService.getAplicaciones().subscribe(data => {
      if (data.codigo == '1') {
        this.listaAplicaciones = data.data;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  consultarMenu() {
    this.seguridadService.getMenus(this.estado, this.nombre).subscribe(data => {
      if (data.codigo == '1') {
        this.listaMenu = data.data;
        this.rerender();
        //this.dtTrigger.next();
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().draw();
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  editarMenu(menu) {
    this.menu = menu;
    this.menuModal.show();
  }

  nuevoMenu() {
    this.menu = { nombre: null, orden: null, id_aplicacion: null };
    this.menuModal.show();
  }

  getMenusPadre() {
    let lista: any[] = [];
    if (this.menu.id_aplicacion) {
      let self = this.menu;
      this.listaMenu.forEach(function (menu) {
        if (self.id_aplicacion == menu.id_aplicacion) {
          lista.push(menu);
        }
      });
    }
    return lista;
  }

  calcularOrden() {
    let maxOrden = 0;
    let self = this.menu;
    if (!this.menu.id_menu) {
      if (this.menu.id_aplicacion) {
        if (this.menu.id_menu_padre) {
          this.listaMenu.forEach(function (menu) {
            if (menu.id_menu_padre == self.id_menu_padre && menu.id_aplicacion == self.id_aplicacion) {
              if (maxOrden < menu.orden) {
                maxOrden = menu.orden;
              }
            }
          });
          this.menu.orden = maxOrden + 1;
        } else {
          this.listaMenu.forEach(function (menu) {
            if (menu.id_menu_padre == self.id_menu_padre && menu.id_aplicacion == self.id_aplicacion) {
              if (maxOrden < menu.orden) {
                maxOrden = menu.orden;
              }
            }
          });
          this.menu.orden = maxOrden + 1;
        }
      }
    }
  }

  grabarMenu(){
    this.seguridadService.grabarMenu(this.menu).subscribe(data=>{
      if(data.codigo == '1'){
        this.mensajeService.alertOK();
        this.consultarMenu();
        this.menuModal.hide();
      }
    });
  }

  eliminarMenu(menu) {
    this.menu = menu;
    Swal.fire({
      title: 'Confirmación!',
      text: "¿Está seguro que desea inactivar el menu?",
      showCancelButton: true,
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.menu.estado = 'I';
        this.grabarMenu();
      }
    })
  }

}
