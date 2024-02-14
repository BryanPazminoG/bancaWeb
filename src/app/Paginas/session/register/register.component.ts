import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import {
  LoginService,
  Usuario as NuevoUsuario,
} from 'src/app/Servicios/login.service';
import { Usuario } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  usuario: string = '';
  antiguaContrasena: string = '';
  contrasena: string = '';
  newContrasena: string = '';
  fechaCreacion: Date = new Date();
  fechaUltimaModificacion: Date = new Date();
  isNew: boolean = this.flujoDatosService.getIsNew();
  mfa: string = '';
  codCliente: any = '';
  usuarioCreado: Usuario | null = null;
  usuarioInfo: NuevoUsuario | null = {
    codCliente: this.codCliente,
    usuario: this.usuario,
    contrasena: this.contrasena,
    fechaCreacion: this.fechaCreacion,
    fechaUltimaModificacion: this.fechaUltimaModificacion,
    mfa: this.mfa,
  };

  constructor(
    private router: Router,
    private loginService: LoginService,
    private flujoDatosService: FlujoDatosService
  ) {}

  returnToLogin() {
    this.router.navigate(['/login']);
  }

  validarContrasena(): void {
    const isNew = this.flujoDatosService.getIsNew();
    console.log('IS NEW', isNew);
    console.log(
      'contraseña',
      this.contrasena,
      'nueva contraseña',
      this.newContrasena
    );
    if (this.contrasena === this.newContrasena) {
      this.mfa = this.flujoDatosService.getCodigo();
      this.fechaCreacion = new Date();
      this.fechaUltimaModificacion = new Date();
      this.usuarioInfo = {
        codCliente: this.flujoDatosService.getId(),
        usuario: this.usuario,
        contrasena: this.contrasena,
        fechaCreacion: this.fechaCreacion,
        fechaUltimaModificacion: this.fechaUltimaModificacion,
        mfa: this.mfa,
      };
      console.log('usuarioInfo antes de crearUsuario', this.usuarioInfo);
      if (isNew) {
        this.crearUsuario();
      } else {
        this.actualizarContrasena();
      }
    } else {
      alert('Las contraseñas no coinciden');
    }
  }
  crearUsuario(): void {
    console.log("ID DEL CLIENTE", localStorage.getItem("codigoCliente"))

    const usuarioACrear = {
      usuario: this.usuarioInfo?.usuario!,
      contrasena: this.usuarioInfo?.contrasena!,
      codCliente: localStorage.getItem("codigoCliente"),
      fechaCreacion: this.fechaCreacion!,
      fechaUltimaModificacion: this.fechaUltimaModificacion!,
    };
    this.loginService.crearUsuario(usuarioACrear).subscribe(
      (data) => {
        this.usuarioCreado = data;
        alert('Usuario registrado');
        this.returnToLogin();
      },
      (error) => {
        alert('Error al registrar el cliente');
        console.error('Error al registrar cliente', error);
      }
    );
  }

  actualizarContrasena(): void {
    const contrasena = {
      idCliente: this.flujoDatosService.getId(),
      contrasenaAntigua: this.antiguaContrasena,
      nuevaContrasena: this.newContrasena,
    };
    this.loginService.actualizarContrasena(contrasena).subscribe(
      (data) => {
        console.log('Contraseña actualizada');
        alert('Contraseña actualizada');
        this.returnToLogin();
      },
      (error) => {
        console.error('Error al actualizar contraseña', error);
        alert('Error al actualizar la contraseña');
      }
    );
  }
}
