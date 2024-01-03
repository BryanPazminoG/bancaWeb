import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { LoginService } from 'src/app/Servicios/login.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  antiguaContrasena: string = '';
  contrasena: string = '';
  newContrasena: string = '';

  constructor(private router: Router,
    private loginService: LoginService,
    private flujoDatosService: FlujoDatosService,
  ) { }

  validarContrasena(): void {
    if(this.contrasena === this.newContrasena){    
      this.actualizarContrasena();
    }else{
      alert("Las contraseñas no coinciden")
    }
  }

  actualizarContrasena(): void {
    const contrasena = {
      idCliente: this.flujoDatosService.getId(),
      contrasenaAntigua: this.antiguaContrasena,
      nuevaContrasena: this.newContrasena,
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
