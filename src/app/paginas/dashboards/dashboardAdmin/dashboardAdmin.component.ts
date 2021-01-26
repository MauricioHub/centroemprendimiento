import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/servicio/Dashboard.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';

import * as Highcharts from 'highcharts';
import 'rxjs/add/operator/map';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { ExportService } from 'src/app/servicio/export.service';
import { PersonaService } from 'src/app/servicio/Persona.service';

@Component({
  selector: 'app-dashboardAdmin',
  templateUrl: './dashboardAdmin.component.html',
  styleUrls: ['./dashboardAdmin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  listaInscripcionesFases: any[] = [];
  listaEmprendedoresFases: any[] = [];
  
  id_sub_programa=1;
  public summaryChartData: any;
  public summaryChartMes: any;

  public Highcharts = Highcharts;
  public barBasicChartOptions: any;

  constructor(private dashboardService: DashboardService,
    private catalogoService: CatalogoService,
    private exportService: ExportService,
    private personaService: PersonaService,
    private mensajeService: MensajeService) {

  }

  ngOnInit() {
    this.dashboardService.getDashboardAdmin().subscribe(data => {
      if (data.codigo == '1') {
        this.listaInscripcionesFases = data.data.listaInscripcionesFases;
        this.listaEmprendedoresFases = data.data.listaEmprendedoresFases;
        this.summaryChartData = this.inscripiconesfecha(data.data.listaInscripcionesFecha);
        this.summaryChartMes = this.inscripiconesfecha(data.data.listaInscripcionesMes);
      }
    });
  }

  inscripiconesfecha(lista: Array<any>) {
    let descubriendo: any[] = [];
    let recrendo: any[] = [];
    let validando: any[] = [];
    let despegando: any[] = [];
    let fechas: any[] = [];
    let ufecha = "";
    let uEtapa = 4;
    lista.forEach(function (e) {
      if (ufecha != "") {
        if (ufecha != e.fecha) {
          if (!(e.orden == 1 && uEtapa == 4)) {
            for (let i = uEtapa + 1; i <= 4; i++) {
              switch (i) {
                case 1: descubriendo.push(0); break;
                case 2: recrendo.push(0); break;
                case 3: validando.push(0); break;
                case 4: despegando.push(0); break;
              }
            }
            for (let i = 1; i < e.orden; i++) {
              switch (i) {
                case 1: descubriendo.push(0); break;
                case 2: recrendo.push(0); break;
                case 3: validando.push(0); break;
                case 4: despegando.push(0); break;
              }
            }
          }
        } else {
          if((e.orden-1) > uEtapa){
            for (let i = uEtapa + 1; i < e.orden; i++) {
              switch (i) {
                case 1: descubriendo.push(0); break;
                case 2: recrendo.push(0); break;
                case 3: validando.push(0); break;
                case 4: despegando.push(0); break;
              }
            }
          }
        }
      }
      switch (e.orden) {
        case 1: descubriendo.push(e.cantidad); break;
        case 2: recrendo.push(e.cantidad); break;
        case 3: validando.push(e.cantidad); break;
        case 4: despegando.push(e.cantidad); break;
      }
      if (e.fecha != ufecha)
        fechas.push(e.fecha);
      ufecha = e.fecha;
      uEtapa = e.orden;
    });
    if(uEtapa<4){
      for (let i = uEtapa + 1; i <= 4; i++) {
        switch (i) {
          case 1: descubriendo.push(0); break;
          case 2: recrendo.push(0); break;
          case 3: validando.push(0); break;
          case 4: despegando.push(0); break;
        }
      }
    }
    let config = {
      chart: {
        height: 250,
        type: 'area',
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      colors: ['#7600FF', '#FCB03C', '#39C5F3', '#2724A0'],
      fill: {
        type: 'solid',
        opacity: 0.2,
      },
      markers: {
        size: 3,
        opacity: 0.9,
        colors: '#fff',
        strokeColor: ['#7600FF', '#FCB03C', '#39C5F3', '#2724A0'],
        strokeWidth: 4,
        hover: {
          size: 7,
        }
      },
      series: [{
        name: 'Descubriendo',
        data: descubriendo
      }, {
        name: 'Re Creando',
        data: recrendo
      }, {
        name: 'Validando',
        data: validando
      }, {
        name: 'Despengando',
        data: despegando
      }],

      xaxis: {
        type: 'datetime',
        categories: fechas,
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy'
        },
      }
    }
    return config;
  }

  getClassFooter(index) {
    let mod = index % 4;
    if (mod == 0) return 'bg-c-green';
    mod = index % 3;
    if (mod == 0) return 'bg-c-red';
    mod = index % 2;
    if (mod == 0) return 'bg-c-blue';
    mod = index % 1;
    if (mod == 0) return 'bg-c-yellow';
  }

  cargarDashboarActividades(){
    this.barBasicChartOptions = {
      chart: {
        type: 'column'
      },
      colors: ['#2196f3', '#7759de', '#f44336', '#00ACC1'],
      title: {
        text: 'Monthly Average Rainfall'
      },
      subtitle: {
        text: 'Source: WorldClimate.com'
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Rainfall (mm)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Tokyo',
        data: [10,20,30,5,8, 0, 9]

      }, {
        name: 'New York',
        data: [1,20,3,15,18,20, 9]

      }, {
        name: 'London',
        data: [10,20,30,5,8, 0, 9]

      }, {
        name: 'Berlin',
        data: [10,20,30,5,8, 0, 9]

      }]
    };
  }

  
}
