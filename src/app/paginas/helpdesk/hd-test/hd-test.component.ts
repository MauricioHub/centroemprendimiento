import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hd-test',
  templateUrl: './hd-test.component.html',
  styleUrls: ['./hd-test.component.scss']
})
export class HdTestComponent implements OnInit {

  public name: String;
  public number: number;

  constructor() { 
    this.name = "Mauricio Guzman";
    this.number = 105;
  }

  ngOnInit(): void {
  }

}
