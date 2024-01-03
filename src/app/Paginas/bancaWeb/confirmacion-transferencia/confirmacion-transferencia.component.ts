import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { InfoCuentaService } from 'src/app/Servicios/info-cuenta.service';

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
@Component({
  selector: 'app-confirmacion-transferencia',
  templateUrl: './confirmacion-transferencia.component.html',
  styleUrls: ['./confirmacion-transferencia.component.css']
})



export class ConfirmacionTransferenciaComponent {
  
  datosTransferencia: any = '';
  cuenta: Cuenta[] = []; 

  constructor(
    private router: Router,
    private infoCuentaService: InfoCuentaService,
    private flujoDatosService: FlujoDatosService
  ) { }

  ngOnInit(): void {
    this.datosTransferencia = this.flujoDatosService.getDatos();
    console.log(this.datosTransferencia);
  }

  obtenerDatosTransferencia(): void {
    this.datosTransferencia = this.flujoDatosService.getDatos();
    console.log(this.datosTransferencia); 
  }


  


  transferenciaExitosa() {
    const codigoCuentaDepositante = parseInt(this.datosTransferencia.cuentaDepositante);
    const codigoCuentabeneficiario = parseInt(this.datosTransferencia.valorInput);
    const montoTransferencia = parseFloat(this.datosTransferencia.monto);

    const cuentaDepositante$ = this.infoCuentaService.obtenerInfoCuentaPorCodCuenta(codigoCuentaDepositante);
    const cuentabeneficiario$ = this.infoCuentaService.obtenerInfoCuentaPorCodCuenta(codigoCuentabeneficiario);

    forkJoin([cuentaDepositante$, cuentabeneficiario$]).subscribe(
      (data) => {
        const cuentaDepositante: Cuenta = data[0];
        const cuentabeneficiario: Cuenta = data[1];

      // Restar el monto de la transferencia a la cuenta depositante
        cuentaDepositante.saldoContable -= montoTransferencia;
        cuentaDepositante.saldoDisponible -= montoTransferencia;

        // Sumar el monto de la transferencia a la cuenta beneficiaria
        cuentabeneficiario.saldoContable += montoTransferencia;
        cuentabeneficiario.saldoDisponible += montoTransferencia;

        

        this.actualizarCuenta(cuentaDepositante);
        this.actualizarCuenta(cuentabeneficiario);



      },
      (error) => {
        console.log(error);
      }
    );
  
    //this.router.navigate(['/tra-exitosa']);
  }
  
  private actualizarCuenta(cuenta: Cuenta) {
    // Llamada al servicio para actualizar la cuenta
    this.infoCuentaService.actualizarDatosEnCuenta(cuenta).subscribe(
      (response) => {
        console.log('Cuenta actualizada:', response);
        // Aquí puedes manejar la respuesta o realizar otras acciones después de la actualización exitosa
      },
      (error) => {
        console.log('Error al actualizar cuenta:', error);
        // Manejo de errores en caso de falla en la actualización
      }
    );
  }
  
}

