import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  DxPivotGridComponent,
  DxChartComponent
} from 'devextreme-angular';
import { Service } from './app.service';
import { DashboardService } from 'src/app/servicio/Dashboard.service';


@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss'],
  providers: [Service, CurrencyPipe]
})
export class PivotComponent implements OnInit, AfterViewInit {

  @ViewChild(DxPivotGridComponent, { static: false }) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent;

  pivotGridDataSource: any;

  constructor(service: Service, private currencyPipe: CurrencyPipe,
    private dashboardService: DashboardService) {
    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.dashboardService.getDatosPivot().subscribe(data=>{
      if(data.codigo="1"){
        this.setDataSource(data.data);
      }
    });
  }

  setDataSource(data) {
    this.pivotGridDataSource = {
      fields: [{
        caption: "Fase actual",
        width: 120,
        dataField: "fase_actual",
        area: "row",
        sortBySummaryField: "Registros"
      }, {
        caption: "Ciudad",
        dataField: "ciudad",
        width: 150,
        area: "row"
      }, {
        dataField: "fecha_registro",
        dataType: "date",
        area: "column"
      }, {
        groupName: "fecha_registro",
        groupInterval: "month",
        visible: true
      }, {
        caption: "Registros",
        dataField: "cantidad",
        dataType: "number",
        summaryType: "sum",
        area: "data"
      }],
      store: data
    }
  }

  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: "splitPanes",
      alternateDataFields: false
    });
  }

  customizeTooltip(args) {
    const valueText = (args.seriesName.indexOf("Total") != -1) ?
      this.currencyPipe.transform(args.originalValue, "USD", "symbol", "1.0-0") :
      args.originalValue;

    return {
      html: args.seriesName + "<div class='currency'>" + valueText + "</div>"
    };
  }

  ngOnInit() {
  }

}
