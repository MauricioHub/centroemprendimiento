import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aprobarActividadMasivo',
  templateUrl: './aprobarActividadMasivo.component.html',
  styleUrls: ['./aprobarActividadMasivo.component.scss']
})
export class AprobarActividadMasivoComponent implements OnInit {

  archivoReferencia = environment.domain+"archivos/formatos/aprobarActividad.xlsx";

  file;
  lista;

  constructor(private programaService: ProgramaService) { }

  ngOnInit() {
  }

  guardar(data) {
    data.data.forEach(element => {
      let formData = new FormData();
      formData.append('id_actividad_inscripcion',element.id_actividad_inscripcion);
      formData.append('estado',element.estado);
      this.programaService.actualizarActividadForm(formData).subscribe(data =>{
        if (data instanceof HttpResponse) {
          if (data.body.codigo == '1') {
            element.statusTrasaction = 'AP';
            element.mensaje = 'Grabado con éxito';
          }else{
            element.statusTrasaction = 'ER';
            element.error = data.body;
          }
        }
      });
    });
  }
}
