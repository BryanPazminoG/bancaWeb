import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { CreditoService } from 'src/app/Servicios/credito.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';

@Component({
  selector: 'app-info-credito',
  templateUrl: './info-credito.component.html',
  styleUrls: ['./info-credito.component.css']
})
export class InfoCreditoComponent implements OnInit {

  @Output() verTablaAmortizacion = new EventEmitter<string>(); // Cambio en el tipo de EventEmitter

  infoCredito: any = {};
  infoAdicional: any = {};
  codCredito: string = '';

  CreditosLoad: any = [{
    "codCredito": 0,
    "numeroOperacion": "",
    "fechaCreacion": "",
  }];
  CreditoSeleccionado: any = {
    "codCredito": 0,
    "codTipoCredito": 0,
    "identificacionCliente": "",
    "tipoCliente": "",
    "numeroCuenta": "",
    "numeroOperacion": "",
    "fechaCreacion": "",
    "monto": 0,
    "plazo": 0,
    "tasaInteres": 0,
    "estado": "",
    "fechaDesembolso": "",
    "fechaUltimoPago": "",
    "capitalPendiente": 0
}
ProximoPago: any = {
  "codCredito": 0,
  "codCuota": 0,
  "capital": 0,
  "interes": 0,
  "montoCuota": 0,
  "capitalRestante": 0,
  "fechaPlanificadaPago": "",
  "estado": "",
}

  constructor(private router: Router, private creditoService: CreditoService, private flujoDatosService: FlujoDatosService, private serviceCliente: ClienteService) { }


  ngOnInit(): void {
    const usuarioLoggeado = localStorage.getItem('usuario');
    
    if (usuarioLoggeado) {
      const usuario = JSON.parse(usuarioLoggeado);
      const codCliente = usuario.codCliente;
      this.getClienteP(codCliente);
      this.CreditosLoad.pop();
    }
  }
  getClienteP(codCliente:any) {
    this.serviceCliente.buscarClientePorId(codCliente).subscribe(
      (data) => {
        if (data) {
          this.cargarCreditosRealizados(data.numeroIdentificacion);
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  cargarCreditosRealizados(identificacion: String) {

    this.creditoService.getCreditoByIdentAPI(identificacion).subscribe(
      (data) => {
        if (data) {
          this.CreditosLoad = data;
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  obtenerInfoCredito(event: any) {
    const valorSeleccionado = event.target.value;
    this.creditoService.getCreditoByIdAPI(valorSeleccionado).subscribe(
      (data) => {
        this.CreditoSeleccionado = data;
        this.flujoDatosService.setIdCredito(valorSeleccionado);
        this.proximoPagoCredito(this.CreditoSeleccionado.codCredito);
      },
      (error) => {
        console.error('Error obteniendo información del crédito', error);
      }
    );
  }
  proximoPagoCredito(id: number) {
    this.creditoService.getProximoPago(id).subscribe(
      (data) => {
        this.ProximoPago = data;
      },
      (error) => {
        console.error('Error obteniendo información del crédito', error);
      }
    );
  }

  mostrarTablaAmortizacion() {
    this.verTablaAmortizacion.emit(this.codCredito);
  }

}
