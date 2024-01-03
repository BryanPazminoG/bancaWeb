import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { LoginService } from 'src/app/Servicios/login.service';
import { MailSenderService } from 'src/app/Servicios/mailSender.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.css']
})
export class VerifyIdentityComponent {
  tipoIdentificacion: string = '';
  numeroIdentificacion: string = '';
  clienteEncontrado: Cliente | null = null;
  destino: string = '';
  codigo: string = '';
  nombreUsuario: string = '';
  idCliente: number = 0;
  nuevoMFA: string = '';

  selectedIdentityType: string = ''; // Variable para almacenar el tipo de identificación seleccionado
  

  constructor(private router: Router,
    private clienteService: ClienteService,
    private flujoDatosService: FlujoDatosService,
    private mailSenderService: MailSenderService, 
    private loginService: LoginService,
  ) { }

  returnToLogin() {
    this.router.navigate(['/login']);
  }
  goToMailVerification() {
    this.router.navigate(['/mail-verification']);
  }

  validateFormatIdentificacion(event: KeyboardEvent | ClipboardEvent): void {
    let key;
  
    if (event.type === 'paste') {
      key = (event as ClipboardEvent).clipboardData?.getData('text/plain') || '';
    } else {
      key = (event as KeyboardEvent).key || String.fromCharCode((event as KeyboardEvent).keyCode);
    }
  
    const regexCedulaRUC = /[0-9]/; // Permitir solo números para Cédula y RUC
    const regexPasaporte = /[0-9a-zA-Z]/; // Permitir números y letras para Pasaporte
  
    let regex: RegExp;
  
    switch (this.tipoIdentificacion) {
      case 'CED': // Cédula
      case 'RUC': // RUC
        regex = regexCedulaRUC;
        break;
      case 'PAS': // Pasaporte
        regex = regexPasaporte;
        break;
      default:
        regex = /[0-9a-zA-Z]/; // Default: Permitir números y letras
    }
  
    if (!regex.test(key)) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (event.returnValue !== undefined) {
        (event as any).returnValue = false;
      }
    }
  }

  getMaxLengthForTipoIdentificacion(): number {
    switch (this.tipoIdentificacion) {
      case 'CED': // Cedula
        return 10;
      case 'RUC': // Pasaporte
        return 13; 
      case 'PAS': // RUC
        return 15; 
      default:
        return 0; 
    }
  }
  
    isInputEnabled(): boolean {
      return ['CED', 'RUC', 'PAS'].includes(this.tipoIdentificacion);
    }

  buscarCliente(): void {
    this.clienteService.buscarClientePorParametros(this.tipoIdentificacion, this.numeroIdentificacion).subscribe(
      (data) => {
        if(!data){
          Swal.fire({
            title: 'Cliente no encontrado',
            text: 'Verifica la información ingresada.',
            icon: 'error'
          });
          // alert('Cliente no encontrado. Verifica la información ingresada.');
        }else{
          console.log('Cliente encontrado:', data);
          this.clienteEncontrado = data;
          this.flujoDatosService.setDatos(data); 
          this.destino = this.clienteEncontrado!.correoElectronico;
          this.nombreUsuario = this.clienteEncontrado!.nombres;
          this.idCliente = this.clienteEncontrado!.codigo;
  
          this.enviarMailVerificacion()
        }
      },
      (error) => {
        console.error('Error al buscar cliente: ', error);
      }
    );
  }

  enviarMailVerificacion(): void {
    const codigoVerificacion = Math.floor(100000 + Math.random() * 900000).toString();
    this.codigo = codigoVerificacion;
    this.nuevoMFA = codigoVerificacion;
    this.flujoDatosService.setCodigo(this.codigo);
    console.log("ENVIANDO CORREO....")
    this.mailSenderService.enviarMailVerificacion(this.destino, this.codigo, this.nombreUsuario).subscribe(
      data => {
        console.log(data);
        // this.actualizarMFA();     
        // TODO: no se puede actualizar MFA debido a que el cliente aun no esta registrado como usuario de banca Web
        this.goToMailVerification();
      },
      error => {
        console.error('Error al enviar el email: ', error);
      }
      )
      const codiguSaved = this.flujoDatosService.getCodigo()
      console.log(codiguSaved)
  }

  actualizarMFA(): void {
    this.loginService.actualizarMFA(this.idCliente, this.nuevoMFA).subscribe(data => {
      console.log(data);
    },
    error => {
      console.log("Error al actualizar MFA: ",error);
    })
  }
  
}

export interface Cuenta {
  codCuenta: number;
  numeroCuenta: string;
  codTipoCuenta: string;
  codCliente: number;
  saldoContable: number;
  saldoDisponible: number;
  estado: string;
  fechaCreacion: string;
  fechaUltimoCambio: string;
  version: number;
}

export interface Cliente {
  codigo: number;
  tipoCliente: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  apellidos: string;
  nombres: string;
  fechaNacimiento: string;
  fechaConstitucion: string;
  razonSocial: string;
  nombreComercial: string;
  direccion: string;
  correoElectronico: string;
  telefono: string;
  fechaModificacion: string;
  version: number;
}
