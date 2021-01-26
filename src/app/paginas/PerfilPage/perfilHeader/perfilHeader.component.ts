import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/estructuras/usuario';
import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-perfilHeader',
  templateUrl: './perfilHeader.component.html',
  styleUrls: ['./perfilHeader.component.css']
})
export class PerfilHeaderComponent implements OnInit {
  introJS = introJs();

  @Input() persona;
  usuario: Usuario = Usuario.getUser();

  constructor() {
    this.introJS.setOptions({
      steps: [
        {
          element: '#paso1',
          intro: 'Hola! Aqui podras visualizar tu foto de perfil!',
          position: 'right'
        }
      ],
      showProgress: true
    });

  }

  ngOnInit() {
    //this.introJS.start();
  }

  redSocial(red){
    if(red)
      window.open(red, '_blank');
  }

}
