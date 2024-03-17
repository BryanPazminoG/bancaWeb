import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { LoginService } from 'src/app/Servicios/login.service';
import { PerfilService } from 'src/app/Servicios/perfil.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  datosPerfil: any = {};
  antiguaContrasena: string = '';
  contrasena: string = '';
  newContrasena: string = '';
  ultimoIngreso = this.formatDate(new Date()) ;

  constructor(private router: Router,
    private loginService: LoginService,
    private flujoDatosService: FlujoDatosService,
    private perfilService: PerfilService
  ) { }

  validarContrasena(): void {
    if(this.contrasena === this.newContrasena){    
      this.actualizarContrasena();
    }else{
      alert("Las contraseñas no coinciden")
    }
  }

  actualizarContrasena(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if(usuarioGuardado){
      
      const contrasena = {
        nombreUsuario: JSON.parse(usuarioGuardado).nombreUsuario,
        clave: this.newContrasena,
      }
      this.loginService.actualizarContrasena(contrasena).subscribe(
        data => {
          console.log("Contraseña actualizada")
          alert("Contraseña actualizada")
        },
        error => {
          console.error("Error al actualizar contraseña", error)
          alert("Error al actualizar la contraseña")
        }
      )
    }
  }

  obtenerDatosPerfil() {
    this.perfilService.obtenerDatosPerfil().subscribe(
      (data) => {
        this.datosPerfil = data;
        console.log('PERFIL', this.datosPerfil);
      },
      (error) => {
        console.error('Error obteniendo datos de perfil', error);
      }
    );
  }

  pad(number: number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  formatDate(date: Date) {
    const day = this.pad(date.getDate());
    const month = this.pad(date.getMonth() + 1); 
    const year = date.getFullYear();
    const hours = this.pad(date.getHours());
    const minutes = this.pad(date.getMinutes());

    return `${day}/${month}/${year} a las ${hours}:${minutes}`;
  }
}
