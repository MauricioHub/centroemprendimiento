import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/estructuras/usuario';
import { LoginService } from 'src/app/servicio/login.service';
import { Respuesta } from 'src/app/estructuras/respuesta';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-signin-v2',
  templateUrl: './auth-signin-v2.component.html',
  styleUrls: ['./auth-signin-v2.component.scss']
})
export class AuthSigninV2Component implements OnInit {

  user: Usuario;
  registro= environment.registro;

  login(): void {
    this.loginService.login(this.user).subscribe((data: Respuesta) => this.validar(data));
  }

  validar(data: Respuesta): void {
    if (data.codigo == '1') {
      Usuario.setUser(data.data);
      this.router.navigate([environment.home]);
    }else{
      this.mensajeService.alertError(null, data.mensaje);
    }
  }

  constructor(private loginService: LoginService, private router: Router, private mensajeService: MensajeService) {
    this.user = new Usuario();
  }

  ngOnInit() {
  }

  olvidarClave(){
    Swal.fire({
      title: "¡Ups!",
      html: '<div class="row"><div class="col-12">'+
      '<p style="font-size: 20px;">Si olvidaste tu contraseña, escríbenos a: <a href="mesadeservicio@epico.gob.ec" target="_blank">mesadeservicio@epico.gob.ec</a></p>' +
      '</div></div>',
      showCancelButton: false,
      type: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Ok, lo entendí!'
    }).then((result) => {
      if (result.value) {
        
      }
    });
  }

}
