import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { MailSenderService } from 'src/app/Servicios/mailSender.service';

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

  constructor(private router: Router,
    private clienteService: ClienteService,
    private flujoDatosService: FlujoDatosService,
    private mailSenderService: MailSenderService, 
  ) { }

  returnToLogin() {
    this.router.navigate(['/login']);
  }
  goToMailVerification() {
    this.router.navigate(['/mail-verification']);
  }

  buscarCliente(): void {
    this.clienteService.buscarClientePorParametros(this.tipoIdentificacion, this.numeroIdentificacion).subscribe(
      (data) => {
        if(!data){
          alert('Cliente no encontrado. Verifica la información ingresada.');
        }else{
          console.log('Cliente encontrado:', data);
          this.clienteEncontrado = data;
          this.flujoDatosService.setDatos(data); 
          this.destino = this.clienteEncontrado!.correoElectronico;
          this.nombreUsuario = this.clienteEncontrado!.nombres;
  
          this.enviarMailVerificacion()
        }
      },
      (error) => {
        console.error('Error al buscar cliente:', error);
      }
    );
  }

  enviarMailVerificacion(): void {
    const codigoVerificacion = Math.floor(100000 + Math.random() * 900000).toString();
    this.codigo = codigoVerificacion;
    this.flujoDatosService.setCodigo(this.codigo);
    console.log("ENVIANDO CORREO....")
    this.mailSenderService.enviarMailVerificacion(this.destino, this.codigo, this.nombreUsuario).subscribe(
      data => {
        console.log(data);
        this.goToMailVerification();
      },
      error => {
        console.error('Error al enviar el email:', error);
      }
      )
      const codiguSaved = this.flujoDatosService.getCodigo()
      console.log(codiguSaved)
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
