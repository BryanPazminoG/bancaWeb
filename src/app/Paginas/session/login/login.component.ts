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
    nombreUsuario: this.usuario!,
    clave: this.contrasena!,
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
      nombreUsuario: this.usuario,
      clave: this.contrasena,
      idCliente: this.usuarioEncontrado?.codCliente,
    }

    this.loginService.autenticarUsuario(credenciales).subscribe(
      data => {
        if(data){
          this.usuarioEncontrado=data;
          this.flujoDatosService.setUsuarioLogin(data)
          console.log("USUARIO LOG", data)
          localStorage.setItem('usuario', JSON.stringify(data));
          this.goToProductos()
        } 
      },
      error => {
        alert ("Usuario o contraseña incorrectos")
        console.error("Error al autenticar el cliente: ", error)
      }
    )
  }

}

export interface CodigoVerificacion {
  codigo: string,
  fechaCreacion: Date,
  estado: string
}

export interface Permisos {
  cuentas: string[];
  creditos: string[];
  tarjetas: string[];
}

export interface Usuario {
  codCliente: any;
  nombreUsuario: string;
  clave: string;
  estado: string;
  fechaUltimoAcceso: Date;
  tipoCliente: string;
  codigoverificacion: CodigoVerificacion;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
  permisos: Permisos
}