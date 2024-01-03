import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  contrasenaActual: string = '';

  formularioContrasena = new FormGroup({
    contrasenaActual: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    ])
  });

  get contrasenaActualCampo() {
    return this.formularioContrasena.get('contrasenaActual');
  }

  verificarContrasena(): void {
    if (this.formularioContrasena.valid) {
      Swal.fire({
        title: 'Contraseña Correctas',
        icon: "success"
      });
      console.log('Contraseña válida:', this.contrasenaActual);
    } else {
      Swal.fire({
        title: 'Contraseña no válida',
        text: 'Vuelva a ingresar las contraseñas',
        icon: 'error'
      });
      console.log('Contraseña no válida');
    }
  }

  constructor(private router: Router) { }
}
