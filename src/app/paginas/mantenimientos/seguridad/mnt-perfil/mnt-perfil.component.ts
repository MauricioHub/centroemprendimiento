import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { TablaMaestro } from 'src/app/interfaces/tablaMaestro';
import { Subject } from 'rxjs';
import { SeguridadService } from 'src/app/servicio/mantenimiento/Seguridad.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import Swal from 'sweetalert2';
import { CatalogoService } from 'src/app/servicio/catalogo.service';

@Component({
  selector: 'app-mnt-perfil',
  templateUrl: './mnt-perfil.component.html',
  styleUrls: ['./mnt-perfil.component.scss']
})
export class MntPerfilComponent implements OnInit ,AfterViewInit, OnDestroy {

  nombre: string="";
  estado: string="T";
  lista: TablaMaestro[];
  listaMenu: any[];
  id_aplicacion: number;
  listaAplicaciones: any[] = [];
  perfil: TablaMaestro = {id: null, nombre: null, estado: null};

  @ViewChild('editarModal', { static: false }) private editarModal;

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('asignarModal', {static: false}) private asignarModal;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(private seguridadService: SeguridadService, 
    private mensajeService: MensajeService,
    private catalogoService: CatalogoService) { }

  ngOnInit() {
    this.consultarPerfiles();
    this.catalogoService.getAplicaciones().subscribe(data => {
      if (data.codigo == '1') {
        this.listaAplicaciones = data.data;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  consultarPerfiles(){
    this.seguridadService.getPerfiles(this.estado, this.nombre).subscribe(data=>{
      if(data.codigo == '1'){
        this.lista=data.data;
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

  editar(perfil){
    this.perfil = perfil;
    this.editarModal.show();
  }

  nuevo(){
    this.perfil = {id: null, nombre: null, estado: null};
    this.editarModal.show();
  }

  grabar(){
    this.seguridadService.grabarPerfil(this.perfil).subscribe(data=>{
      if(data.codigo == '1'){
        this.mensajeService.alertOK();
        this.consultarPerfiles();
        this.editarModal.hide();
      }
      else{
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  eliminar(perfil) {
    this.perfil = perfil;
    Swal.fire({
      title: 'Confirmación!',
      text: "¿Está seguro que desea eliminar?",
      showCancelButton: true,
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.perfil.estado = 'I';
        this.grabar();
      }
    })
  }

  asignarMenu(perfil){
    this.perfil = perfil;
    this.id_aplicacion = 3;
    this.consultarMenus();
    this.asignarModal.show();
  }

  consultarMenus(){
    this.listaMenu = null;
    this.seguridadService.getManuxPerfil(this.perfil.id, this.id_aplicacion).subscribe(data=>{
      if(data.codigo == '1'){
        data.data.forEach(element => {
          element.expandable = true;
        });
        this.listaMenu = data.data;
      }else{
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  listaMenuNew;
  setListaMenu(lista){
    this.listaMenuNew = lista;
  }

  grabarAsignacion(){
    this.seguridadService.grabarAsignacionMenus(this.listaMenuNew, this.perfil.id, this.id_aplicacion).subscribe(data=>{
      if(data.codigo=='1'){
        this.mensajeService.alertOK();
        this.asignarModal.hide();
      }else{
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

}
