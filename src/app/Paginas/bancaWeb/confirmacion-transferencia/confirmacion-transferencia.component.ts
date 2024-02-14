import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { InfoCuentaService } from 'src/app/Servicios/info-cuenta.service';
import { TransferenciasService } from 'src/app/Servicios/transferencias.service';
import Swal from 'sweetalert2';

interface Cuenta {
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

interface Transferencia {
  codCuentaOrigen: number;
  codCuentaDestino: number;
  valorDebe: number;
  valorHaber: number;
  tipoTransaccion: string;
  detalle: string;
  fechaCreacion: Date;
}
@Component({
  selector: 'app-confirmacion-transferencia',
  templateUrl: './confirmacion-transferencia.component.html',
  styleUrls: ['./confirmacion-transferencia.component.css'],
})
export class ConfirmacionTransferenciaComponent {
  datosTransferencia: any = '';
  cuenta: Cuenta[] = [];
  contExito: any = 0;
  
  constructor(
    private router: Router,
    private infoCuentaService: InfoCuentaService,
    private flujoDatosService: FlujoDatosService,
    private transferenciaService: TransferenciasService,
  ) {}

  ngOnInit(): void {
    this.datosTransferencia = this.flujoDatosService.getDatos();
  }

  transferenciaExitosa() {
    const codigoCuentaDepositante = parseInt(
      this.datosTransferencia.cuentaDepositante
    );
    const codigoCuentabeneficiario = parseInt(
      this.datosTransferencia.valorInput
    );
    const montoTransferencia = parseFloat(this.datosTransferencia.monto);

    const cuentaDepositante$ =
      this.infoCuentaService.obtenerInfoCuentaPorCodCuenta(
        codigoCuentaDepositante
      );
    const cuentabeneficiario$ =
      this.infoCuentaService.obtenerInfoCuentaPorCodCuenta(
        codigoCuentabeneficiario
      );

    forkJoin([cuentaDepositante$, cuentabeneficiario$]).subscribe(
      (data) => {
        const cuentaDepositante: Cuenta = data[0];
        const cuentabeneficiario: Cuenta = data[1];

        const transferenciaOrigen: Transferencia = {
          codCuentaOrigen: cuentaDepositante.codCuenta,
          codCuentaDestino: cuentabeneficiario.codCuenta,
          valorDebe: montoTransferencia,
          valorHaber: 0,
          tipoTransaccion: 'TRE',
          detalle: this.datosTransferencia.detalle,
          fechaCreacion: new Date()
        };

        const transferenciaDestino: Transferencia = {
          codCuentaOrigen: cuentabeneficiario.codCuenta,
          codCuentaDestino: cuentaDepositante.codCuenta,
          valorDebe: 0,
          valorHaber: montoTransferencia,
          tipoTransaccion: 'TEN',
          detalle: this.datosTransferencia.detalle,
          fechaCreacion: new Date()
        };
        
        this.realizarTransferencia(transferenciaOrigen);
        this.realizarTransferencia(transferenciaDestino);
        this.router.navigate(['/productos']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private actualizarCuenta(cuenta: Cuenta) {
    this.infoCuentaService.actualizarDatosEnCuenta(cuenta).subscribe(
      (response) => {
        console.log('Cuenta actualizada:', response);        
      },
      (error) => {
        console.log('Error al actualizar cuenta:', error);
      }
    );
  }

  private realizarTransferencia(transferencia: Transferencia) {
    this.transferenciaService.realizarTransferencia(transferencia).subscribe(
      (response) => {
        console.log('Transaccion realizada', response);
        this.mensajeExito('Transferencia exitosa');
      },
      (error) => {
        console.log('Error al actualizar cuenta:', error);
      }
    );
  }

  cancelar() {
    this.mensaje('Transacción cancelada');
    this.router.navigate(['/productos']);
  }

  mensaje(texto: any) {
    Swal.fire({
      text: texto,
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
  }

  mensajeExito(texto: any) {
    Swal.fire({
      title: 'Éxito',
      text: texto,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }
}
