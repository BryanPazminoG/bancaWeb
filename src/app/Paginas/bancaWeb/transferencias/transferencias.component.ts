// componentes/transferencias/transferencias.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { TransferenciasService } from 'src/app/Servicios/transferencias.service';
import { InfoCuentaService } from 'src/app/Servicios/info-cuenta.service';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';


@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {
  transferencia: any = {};
  cuentas: any[] = []; // Usamos un arreglo de objetos para las cuentas
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
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      const codCliente = usuario.codCliente;
      console.log(codCliente);
      this.obtenerCuentasAhorro(codCliente);
    }
    
  }

  

  obtenerCuentasAhorro(codCliente: any) {
    this.productosService.obtenerCuentasAhorro(codCliente).subscribe(
      (data) => {
        this.cuentas = data;
        console.log(data);
      },
      (error) => {
        console.error('Error obteniendo cuentas de ahorro', error);
      }
    );
  }

  saldoContable: number = 1;
  saldoDisponible: number = 1;
  
  actualizarValores(event: any) {
    console.log(event.target.value);
    
    this.infoCuentaService.obtenerInfoCuentaPorCodCuenta(event.target.value).subscribe(
      (data) => {
        this.saldoContable = data.saldoContable;
        this.saldoDisponible = data.saldoContable;

        this.valoresDepositante = {
          cuentaDepositante: event.target.value,
          valorDisponible: this.saldoDisponible,
          
          codClienteDepositante: data.codCliente
        };
      },
      (error) => {
        console.error('Error obteniendo información adicional de la cuenta', error);
      }
    );  
  }

  validarCuenta(valorInput: string) {
    this.infoCuentaService.obtenerInfoCuentaPorCodCuenta(valorInput).subscribe(
      (data) => {
        this.clienteService.buscarClientePorId(data.codCliente).subscribe(
          (response) => {
            if (response.apellidos && response.nombres) {
              this.transferencia.beneficiarioNombre = `${response.nombres} ${response.apellidos}`;
            } else if (response.nombreComercial !== null || response.razonSocial !== null) {
              this.transferencia.beneficiarioNombre = response.nombreComercial || response.razonSocial;
            } else {
              this.transferencia.beneficiarioNombre = 'Cuenta no encontrada.';
            }

            this.valoresBeneficiario = {
              beneficiarioNombre: this.transferencia.beneficiarioNombre,
              valorInput: valorInput,
              codClienteBeneficiario: data.codCliente
            };
          },
          (error) => {
            console.error('Error obteniendo información adicional de la cuenta', error);
          }
        );
      },
      (error) => {
        console.error('Error obteniendo información adicional de la cuenta', error);
      }
    );
  }






  confirmarTransferencia() {

    const valorMonto = this.transferencia.monto;
    
    const datosTransferencia = {
      ...this.valoresDepositante,
      ...this.valoresBeneficiario,
      monto: valorMonto,
    };

    console.log(datosTransferencia)

    const monto = parseFloat(datosTransferencia.monto);
    const valorDisponible = parseFloat(this.valoresDepositante.valorDisponible);

    if (monto > valorDisponible) {
      alert('El monto es mayor que el valor disponible. Por favor, ingrese un monto válido.');
      return; // Sale de la función si el monto es mayor que el valor disponible
    } else {
      this.flujoDatosService.setDatos(datosTransferencia);
      this.router.navigate(['/confirmacion-transferencia']);
    }

    // this.transferenciasService.realizarTransferencia(this.transferencia).subscribe(
    //   (data) => {
    //     console.log('Transferencia realizada con éxito', data);
    //     this.router.navigate(['/confirmacion-transferencia']);
    //   },
    //   (error) => {
    //     console.error('Error al realizar la transferencia', error);
    //   }
    // );
  }

  limpiarFormulario(form: any) {
    form.resetForm();
  }
}
