import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  introJS = introJs();

  constructor(private router: Router) { }

  ngOnInit() {
    this.introJS.start();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
