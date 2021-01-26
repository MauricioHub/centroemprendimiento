import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { AsistentetecnicoService } from 'src/app/servicio/Asistentetecnico.service';
import { HorarioAt } from 'src/app/interfaces/horarioat';

@Component({
  selector: 'app-mnt-asistentes-tecnicos-horario',
  templateUrl: './mnt-asistentes-tecnicos-horario.component.html',
  styleUrls: ['./mnt-asistentes-tecnicos-horario.component.scss'],
})
export class MntAsistentesTecnicosHorarioComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();  

  horarioAT: HorarioAt[];
  nombreAsistenteTecnico = '';
  idAsistenteTecnico: number;

  txtDia = 'LUNES';
  txtHoraInicio = '18:00';
  txtHoraFin = '15:00';

  constructor(
    private route: ActivatedRoute,
    private asistenteTecnicoService: AsistentetecnicoService
  ) { }

  ngOnInit() {
    this.getAsistenteTecnico();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }  

  getAsistenteTecnico(): void {
    this.idAsistenteTecnico = +this.route.snapshot.paramMap.get('id_asistencia_tecnica');
    this.nombreAsistenteTecnico = this.route.snapshot.paramMap.get('nombre').toString();
    this.getAsistenteTecnicoHorario(this.idAsistenteTecnico)
  }

  getAsistenteTecnicoHorario(idAsistenciaTecnica: number): void {
    this.asistenteTecnicoService.getHorarioAT(idAsistenciaTecnica)
    .subscribe(
      horarioAT => {
        this.horarioAT = horarioAT
        this.dtTrigger.next();
      }
    )
  }

  agregarAHorario(): void {
    if (Date.parse('2020-01-01 ' + this.txtHoraInicio) > Date.parse('2020-01-01 ' + this.txtHoraFin)) {
      //console.log('es mayor')
      this.errorSwal('Error', 'La fecha de inicio no puede ser menor a la fecha de fin')
    } else {
      // Si pasa el primer filtro validar que no sea un horario repetido o que se cruze
      this.horarioAT.push({id_asistencia_tecnica: this.idAsistenteTecnico,
      dia: this.txtDia, hora_inicio: this.txtHoraInicio, hora_fin: this.txtHoraFin})
    }
  }

  eliminarItem(i: number): void {
    Swal.fire({
      title: 'Eliminar el item?',
      text: 'Una vez eliminado no se podra recuperar la informacion',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
        if (willDelete.dismiss) {
        } else {
          this.horarioAT.splice(i, 1)
        }
      });
  }

  guardarHorario(): void {
    this.asistenteTecnicoService.addHorario(this.horarioAT)
    .subscribe(result =>{
      const myJson = JSON.stringify(result);
      const myJsonResponse = JSON.parse(myJson)
      if(myJsonResponse.estado === '200') {
        Swal.fire('Informacion', 'Transaccion realizada con éxito', 'success');
      }
      else {
        Swal.fire('Error', 'Intentelo nuevamente', 'error');
      }
    });
  }


  errorSwal(titulo: string, mensaje: string) {
    Swal.fire(titulo, mensaje, 'error');
  }

}
