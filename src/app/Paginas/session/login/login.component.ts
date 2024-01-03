import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credenciales, LoginService } from 'src/app/Servicios/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  usuario: string  = "";
  contrasena: string = "";
  credenciales: Credenciales | null = {
    usuario: this.usuario!,
    contrasena: this.contrasena!,
  };
  usuarioEncontrado: Usuario | null = null;

  constructor(private router: Router,
    private loginService: LoginService  
  ) { }

  goToVerify () {
    this.router.navigate(['/verify-identity']);
  }
  goToProductos () {
    this.router.navigate(['/productos']);
  }

  autenticarCliente(): void {
    const credenciales = {
      usuario: this.usuario,
      contrasena: this.contrasena,
    }
    this.loginService.autenticarUsuario(credenciales).subscribe(
      data => {
        if(!data){
          Swal.fire({
            title: 'Usuario o contraseña incorrectos',
            text: 'Verifique su usuario y contraseña',
            icon: 'error'
          });
          // alert("Usuario o contraseña incorrectos")
        }else {
          this.usuarioEncontrado;
          this.goToProductos()
        }
      },
      error => {
        console.error("Error al autenticar el cliente: ", error)
      }
    )
  }

}

export interface Usuario {
  codCliente: number,
  usuario: string,
  contrasena: string,
  mfa: string,
  fechaCreacion: string,
  fechaUltimaModificacion: string,
  version: number
}