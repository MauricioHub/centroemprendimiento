import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse, HttpParams, HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Mantenimiento } from 'src/app/interfaces/Mantenimiento';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { GeneralService } from 'src/app/servicio/mantenimiento/General.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { PersonaService } from 'src/app/servicio/Persona.service';
import { Persona } from 'src/app/estructuras/persona';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UsuarioService } from 'src/app/servicio/Usuario.service';

@Component({
  selector: 'app-mntPersona',
  templateUrl: './mntPersona.component.html',
  styleUrls: ['./mntPersona.component.css']
})
export class MntPersonaComponent extends Mantenimiento implements OnInit, AfterViewInit, OnDestroy {

  cod_trama: string = "MXUSU001";
  birthDateStr: string = '';
  nombre: string = "";
  estado: string = "T";
  isCreate: boolean = false;
  persona: Persona;
  usuario;
  userMail;
  
  tabla = "persona";
  campos = ["nombre", "estado", "fecha", "hora_inicio", "hora_fin", "url", "id_tipo_evento", "codigo", "id_evento_mec", "color", "cupo"];
  camposLista = [{ attr: "id", name: "Id" }, { attr: "nombre", name: "Evento" }, { attr: "tipo_evento", name: "Tipo evento" }, { attr: "codigo", name: "Codigo padre" }, { attr: "color", name: "Color" }];

  radioUsu;
  birthDate;
  citiesLst;
  jobSituationLst;
  academicGradeLst;
  interestedDueLst;
  institutionLst;
  provinciasList;

  @ViewChild('editarModal', { static: false }) private editarModal;
  @ViewChild('horarioModal', { static: false }) private horarioModal;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private catalogoService: CatalogoService,
    private generalService: GeneralService,
    private mensajeService: MensajeService,
    private _datePipeService: DatePipe,
    private personaService: PersonaService,
    private usuarioService: UsuarioService) {
      super();
    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.consultarDatos();
    this.getCitiesLst();
    this.getJobSituationLst();
    this.getAcademicGradeLst();
    this.getInterestedDueLst();
    this.getInstitutionLst();
    this.catalogoService.getUbicaciones().subscribe(data => {
      if (data.codigo == '1') {
        this.provinciasList = data.data;
      }
    });
  }

  consultarDatos() {
    this.personaService.getPersonas()
    .subscribe(data => {
      if (data.codigo == '1') {
        this.lista = data.data;
        this.rerender();
      } else {
        console.log(data.mensaje);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
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

  getCitiesLst(){
    if(this.registro){
      this.catalogoService.getUbicaciones(null, this.registro.id_provincia).subscribe(data => {
        if (data.codigo == '1') {
          this.citiesLst = data.data;
        }
      });
    }
  }

  getJobSituationLst(){
    this.catalogoService.getListaSituacionLaboral().subscribe(data => {
      if (data.codigo == '1') {
        this.jobSituationLst = data.data;
      }
    });
  }

  getAcademicGradeLst(){
    this.catalogoService.getListaNivelAcademico().subscribe(data => {
      if (data.codigo == '1') {
        this.academicGradeLst = data.data;
      }
    });
  }

  getInterestedDueLst(){
    this.catalogoService.getListaInteresCentroEmprendimiento().subscribe(data => {
      if (data.codigo == '1') {
        this.interestedDueLst = data.data;
      }
    });
  }

  getInstitutionLst(){
    this.catalogoService.getInstitutionLst().subscribe(data => {
      if (data.codigo == '1') {
        this.institutionLst = data.data;
      }
    });
  }

  public isEmpty(str:string) {
    return (!str || 0 === str.length);
  }

  jsonDateToString(time){
    let newDate = '' + time.month + '/' + time.day + '/' + time.year;
    return newDate;
  }

  strDateToLong(timeStr){
    let newDate = new Date(timeStr).valueOf();
    return newDate;
  }

  formatDateReport(date) {
    return this._datePipeService.transform(date, 'yyyy-MM-dd');
  }


  birthDateBrowse(newStartDate){
    try{
      this.birthDate = newStartDate
      this.birthDateStr = this.jsonDateToString(this.birthDate);
      this.birthDateStr = this.formatDateReport(new Date(this.birthDateStr));
    } catch(error){
      console.log(error);
    }      
  }

  setData(registro) {
    this.registro = registro;
  }

  preGrabar(){
    if(this.radioUsu){
      this.insertUser();
    } else{
      this.grabar();
    }
  }

  grabar() {
    if(this.isValidCardID(this.registro.identificacion)){
      this.registro.fecha_nacimiento = this.birthDateStr;
      if(this.registro.fecha_nacimiento === undefined){
        this.mensajeService.alertError(null, 'Debe ingresar Fecha Nacimiento.');
      } else if(this.registro.fecha_nacimiento === null){
        this.mensajeService.alertError(null, 'Debe ingresar Fecha Nacimiento.');
      } else{
        if(this.registro.id_usuario === undefined || this.registro.id_usuario === null)
          this.registro.id_usuario = null;
        this.registro.fecha_nacimiento = this.birthDateStr;
        this.personaService.grabarPersona(this.registro)
        .subscribe(data => {
          if (data.codigo == '1') {
            this.mensajeService.alertOK();
            this.editarModal.hide();
            this.consultarDatos();
          } else {
            this.mensajeService.alertError(null, data.mensaje);
          }
        });
      }
    } else{
      this.mensajeService.alertError(null, 'Cédula debe ser válida.');
    }
  }

  insertUser(){
    if(this.isValidCardID(this.registro.identificacion)){
      if(this.registro.id_institucion === undefined){
        this.mensajeService.alertError(null, 'Debe especificar institucion');
      } else{
        if(this.registro.id_institucion == ''){
          this.mensajeService.alertError(null, 'Debe especificar institucion');
        } else{
          if(this.registro.email===undefined || this.registro.email===null){
            this.mensajeService.alertError(null, 'Llene campos requeridos.');
          } else if(this.registro.nombre===undefined || this.registro.nombre===null){
            this.mensajeService.alertError(null, 'Llene campos requeridos.');
          } else if(this.registro.apellido===undefined || this.registro.apellido===null){
            this.mensajeService.alertError(null, 'Llene campos requeridos.');
          } else{
            this.usuario = {
              "usuario" : this.registro.email,
              "nombre" : this.registro.nombre,
              "apellido" : this.registro.apellido,
              "correo" : this.registro.email,
              "id_institucion" : this.registro.id_institucion,
              "foto" : '',
              "password" : this.registro.identificacion,
              "estado" : 'A'
            }
    
            this.usuarioService.insertUser(this.usuario)
            .subscribe(data => {
              if (data.codigo == '1') {
                this.usuario = data.data;
                this.registro.id_usuario = this.usuario.id;
                this.sendUserMail();
              } else {
                this.mensajeService.alertError(null, data.mensaje);
              }
            });
          }
        }
      }
    } else{
      this.mensajeService.alertError(null, 'Cédula debe ser válida.');
    }
  }

  sendUserMail(){
    this.userMail = {"id_persona" : this.registro.id}
    const body = new HttpParams()
    .set('cod_trama', this.cod_trama)
    .set('datos', JSON.stringify(this.userMail))
    .set('email', this.registro.email);

    this.usuarioService.sendUserMail(body)
    .subscribe(data => {
      if (data.codigo == '1') {
        this.grabar();
      } else {
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }  

  eliminar(dato) {
    this.registro = dato;

    Swal.fire({
      title: 'Confirmación!',
      text: "¿Está seguro que desea eliminar?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'No, Declinar.'
    }).then((result) => {
      if (result.value) {
        this.registro.estado = 'I';
        this.birthDate = this.registro.fecha_nacimiento;
        this.birthDateStr = this.registro.fecha_nacimiento;
        this.grabar();
        Swal.fire(
          'Eliminado!',
          'Su registro ha sido eliminado.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Su registro está seguro :)',
          'error'
        )
      }
    });
  }

  editar(dato) {
    this.isCreate = false;
    this.registro = dato;
    this.birthDate = this.registro.fecha_nacimiento;
    this.birthDateStr = this.registro.fecha_nacimiento;
    this.getCitiesLst();
    this.editarModal.show();
  }

  nuevo() {
    this.isCreate = true;
    this.registro = {};
    this.campos.forEach(item => {
      this.registro[item] = null;
    });
    this.editarModal.show();
  }

  isValidCardID(cardID: string): boolean{
    var total = 0, i;
    var longitud;
    
    if(cardID === undefined){
      return false;
    } else{
      longitud = cardID.length;
      if (cardID !== "" && longitud === 10){
        for(i = 0; i < (longitud - 1); i++){
          if (i%2 === 0) {
            var aux = parseInt(cardID.charAt(i)) * 2;
            if (aux > 9) aux -= 9;
              total += aux;
          } else {
            total += parseInt(cardID.charAt(i));
          }
        }
        total = total % 10 ? 10 - total % 10 : 0;
        if (parseInt(cardID.charAt(longitud-1)) == total)
          return true;
        else
          return false;
      }
    }
  }
}  