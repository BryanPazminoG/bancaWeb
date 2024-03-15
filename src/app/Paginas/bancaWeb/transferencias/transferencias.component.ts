// componentes/transferencias/transferencias.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { TransferenciasService } from 'src/app/Servicios/transferencias.service';
import { InfoCuentaService } from 'src/app/Servicios/info-cuenta.service';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {
  transferencia: any = {};
  cuentas: any[] = [];
  valoresDepositante: any = {};
  valoresBeneficiario: any = {};


  constructor(
    private router: Router,
    private transferenciasService: TransferenciasService,
    private productosService: ProductosService,
    private infoCuentaService: InfoCuentaService,
    private clienteService: ClienteService,
    private flujoDatosService: FlujoDatosService
    
  ) {}

  ngOnInit(): void {    
    this.transferencia.cuentaOrigen = '';
    this.transferencia.monto = 0;
    this.transferencia.beneficiarioNombre = '';
    this.transferencia.beneficiarioNumeroCuenta = '';
    this.transferencia.descripcion = '';
    this.obtenerCuentasAhorro("476be3079b634e5f4c63c1994d0f13b3");
  }

  obtenerCuentasAhorro(codCliente: any) {
    this.productosService.obtenerCuentasAhorro(codCliente).subscribe(
      (data) => {
        this.cuentas = data;
      },
      (error) => {
        console.error('Error obteniendo cuentas de ahorro', error);
      }
    );
  }

  saldoContable: number = 0;
  saldoDisponible: number = 0;

  actualizarValores(event: any) {
    this.infoCuentaService
      .obtenerInfoCuentaPorCodCuenta(event.target.value)
      .subscribe(
        (data) => {
          this.saldoContable = data.saldoContable;
          this.saldoDisponible = data.saldoContable;

          this.valoresDepositante = {
            cuentaDepositante: event.target.value,
            valorDisponible: this.saldoDisponible,

            codClienteDepositante: data.codCliente,
          };
        },
        (error) => {
          console.error(
            'Error obteniendo información adicional de la cuenta',
            error
          );
        }
      );
  }

  validarCuenta(valorInput: string) {
    if (valorInput != '') {
      if (valorInput != this.transferencia.cuentaOrigen) {
        this.infoCuentaService
          .obtenerInfoCuentaPorCodCuenta(valorInput)
          .subscribe(
            (data) => {
              this.clienteService.buscarClientePorId(data.codCliente).subscribe(
                (response) => {
                  if (response.apellidos && response.nombres) {
                    this.transferencia.beneficiarioNombre = `${response.nombres} ${response.apellidos}`;
                  } else if (
                    response.nombreComercial !== null ||
                    response.razonSocial !== null
                  ) {
                    this.transferencia.beneficiarioNombre =
                      response.nombreComercial || response.razonSocial;
                  } else {
                    this.transferencia.beneficiarioNombre =
                      'Cuenta no encontrada.';
                  }

                  this.valoresBeneficiario = {
                    beneficiarioNombre: this.transferencia.beneficiarioNombre,
                    valorInput: valorInput,
                    codClienteBeneficiario: data.codCliente,
                  };
                },
                (error) => {
                  console.error(
                    'Error obteniendo información adicional de la cuenta',
                    error
                  );
                  this.mensajeError('No se ha podido encontrar la cuenta');
                }
              );
            },
            (error) => {
              console.error(
                'Error obteniendo información adicional de la cuenta',
                error
              );
            }
          );
      } else {
        this.mensajeError(
          'No se puede realizar transacción hacia la misma cuenta. Escoja otro beneficiario'
        );
        this.transferencia.beneficiarioNombre = '';
      }
    } else {
      this.mensajeError('Error al validar la cuenta. Ingrese un número válido');
    }
  }

  mensajeError(texto: any) {
    Swal.fire({
      title: 'Error',
      text: texto,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  confirmarTransferencia() {
    if (
      this.transferencia.cuentaOrigen != '' &&
      this.transferencia.beneficiarioNumeroCuenta != ''
    ) {
      if (this.transferencia.beneficiarioNombre != '') {
        if (this.transferencia.monto > 0) {
          if (
            this.transferencia.cuentaOrigen !==
            this.transferencia.beneficiarioNumeroCuenta
          ) {
            const valorMonto = this.transferencia.monto;

            const datosTransferencia = {
              ...this.valoresDepositante,
              ...this.valoresBeneficiario,
              monto: valorMonto,
              detalle: this.transferencia.descripcion,
            };

            const monto = parseFloat(datosTransferencia.monto);
            const valorDisponible = parseFloat(
              this.valoresDepositante.valorDisponible
            );

            if (monto > valorDisponible) {
              this.mensajeError(
                'El monto es mayor que el valor disponible. Por favor, ingrese un monto válido.'
              );
              return;
            } else {
              this.flujoDatosService.setDatos(datosTransferencia);
              this.router.navigate(['/confirmacion-transferencia']);
            }
          } else {
            this.mensajeError(
              'No se puede realizar transacción hacia la misma cuenta. Escoja otro beneficiario'
            );
            this.transferencia.beneficiarioNombre = '';
            return;
          }
        } else {
          this.mensajeError('El monto debe ser mayor a $ 0.00');
        }
      } else {
        this.mensajeError('Se debe validar la cuenta');
      }
    } else {
      this.mensajeError('Complete todos los campos obligatorios');
    }
  }

  limpiarFormulario(form: any) {
    form.resetForm();
  }
}
