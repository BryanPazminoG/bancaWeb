import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { Credenciales, LoginService } from 'src/app/Servicios/login.service';

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
    private loginService: LoginService,
    private flujoDatosService: FlujoDatosService 
  ) { }

  goToVerify () {
    this.flujoDatosService.setIsNew(true);
    this.router.navigate(['/verify-identity']);
  }
  goToRecoveryPassword () {
    this.flujoDatosService.setIsNew(false);
    this.router.navigate(['/verify-identity']);
  }
  goToProductos () {
    this.router.navigate(['/productos']);
  }

  autenticarCliente(): void {
    const credenciales = {
      usuario: this.usuario,
      contrasena: this.contrasena,
      idCliente: "78836b78e1f268b2709e17c27481866d",
    }

    this.loginService.autenticarUsuario(credenciales).subscribe(
      data => {

        if(data == null){
          this.usuarioEncontrado=data;
          this.flujoDatosService.setUsuarioLogin(data)
          localStorage.setItem('usuario', JSON.stringify(credenciales));
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
  codCliente: any,
  usuario: string,
  contrasena: string,
  mfa: string,
  fechaCreacion: string,
  fechaUltimaModificacion: string,
  version: number
}