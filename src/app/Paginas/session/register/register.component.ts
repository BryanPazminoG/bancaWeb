import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { LoginService, Usuario } from 'src/app/Servicios/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  usuario: string = '';
  contrasena: string = '';
  newContrasena: string = '';
  fechaCreacion: string = '';
  fechaUltimaModificacion: string = '';
  mfa: string = '';
  usuarioInfo: Usuario | null = {
    usuario: this.usuario,
    contrasena: this.contrasena,
    fechaCreacion: this.fechaCreacion,
    fechaUltimaModificacion: this.fechaUltimaModificacion,
    mfa: this.mfa,
  }

  constructor(private router: Router,
    private loginService: LoginService,
    private flujoDatosService: FlujoDatosService  
  ) { }

  returnToLogin() {
    this.router.navigate(['/login']);
  }

  validarContrasena(): void {
    if(this.contrasena === this.newContrasena){
      Swal.fire({
        title: 'Contraseña Correctas',
        icon: "success"
      });
      // alert("Contraseñas correctas")
      this.mfa = this.flujoDatosService.getCodigo()
      this.fechaCreacion = new Date().toString()
      this.fechaUltimaModificacion = new Date().toString()
      this.crearUsuario();
      this.returnToLogin()
    }else{
      Swal.fire({
        title: 'Las Contraseñas No Coinciden',
        text: 'Vuelva a ingresar las contraseñas',
        icon: 'error'
      });
      // alert("Las contraseñas no coinciden")
    }
  }

  crearUsuario(): void {
    const usuario = {
      usuario: this.usuario,
      contrasena: this.contrasena,
      fechaCreacion: this.fechaCreacion,
      fechaUltimaModificacion: this.fechaUltimaModificacion,
      mfa: this.mfa,
    }
    this.loginService.crearUsuario(usuario).subscribe(
      data => {
        console.log("USUARIO CREADO: ", data)
        Swal.fire({
          title: 'Usuario Registrado con Exito',
          icon: "success"
        });
        // alert("Usuario registrado")
      },
      error => {
        console.error("Error al registrar cliente", error)
      }
    )
  }

}
