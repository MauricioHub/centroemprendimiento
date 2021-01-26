import { Component, OnInit } from '@angular/core';
import {ChartDB} from './chart/chart-data';

@Component({
  selector: 'app-hd-dashboard',
  templateUrl: './hd-dashboard.component.html',
  styleUrls: ['./hd-dashboard.component.scss']
})
export class HdDashboardComponent implements OnInit {
  public chartDB: any;
  public name: String;
  public client: String; 

  constructor() {
    this.chartDB = ChartDB;
    this.name = "Mauricio Guzman";
    this.client = "Sigifredo Chuchuca";
  }

  ngOnInit() {
  }

}
