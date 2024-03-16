import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { CreditoService } from 'src/app/Servicios/credito.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-datos-credito',
  templateUrl: './datos-credito.component.html',
  styleUrls: ['./datos-credito.component.css']
})
export class DatosCreditoComponent implements OnInit{
  tipoCredito = {
    'codTipoCredito': 0,
    'codTasaInteres': '',
    'nombre': '',
    'plazoMinimo': 0,
    'plazoMaximo': 0,
    'montoMinimo': 0,
    'montoMaximo': 0,
  };
  tasaInteres = {
    'codTasaInteres': '',
    'tipoTasaInteres': '',
    'nombre': '',
    'tasaMinima': 0,
    'tasaMaxima': 0,
  };
  credito = {
    'codTipoCredito': 0,
    'codCliente': '',
    'fecha_creacion': '',
    'tasaInteres': 0,
    'monto': 0,
    'plazo': 0,
  };
  listaTipoCredito = [{
    'codTipoCredito': 0,
    'nombre': '',
  }];

  constructor(
    private router: Router,
    private serviceCredito: CreditoService,
    private flujoDatosService: FlujoDatosService
  ) { }

  ngOnInit(): void {
    this.getAllTipoCredito();
  }
  getAllTipoCredito() {
    this.serviceCredito.getAllTipoCreAPI().subscribe(
      (data) => {
        if (data) {
          this.listaTipoCredito = data;
          this.listaTipoCredito.pop();
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  getIdTipoCredito(event: any) {
    const valorSeleccionado = event.target.value;

    if (valorSeleccionado != 0) {
      this.serviceCredito.getByIdTipoCreAPI(valorSeleccionado).subscribe(
        (data) => {
          console.log(data);
          this.tipoCredito = data;
          this.getByIdTasaInt();
        },
        (error) => {
          console.error('Error al hacer la solicitud:', error);
        }
      );
    }
  }
  getByIdTasaInt() {
    const valorSeleccionado = this.tipoCredito.codTasaInteres;
    console.log(valorSeleccionado);
    if (valorSeleccionado != "") {
      this.serviceCredito.getByIdTasaIntAPI(valorSeleccionado).subscribe(
        (data) => {
          if (data) {
            this.tasaInteres = data;
            this.credito.tasaInteres = this.tasaInteres.tasaMaxima;
          }
        },
        (error) => {
          console.error('Error al hacer la solicitud:', error);
        }
      );
    }
  }

  validacionesEnteros(event: any, min: number, max: number) {
    let valor = Math.round(event.target.value);
    if (valor < min) event.target.value = min;
    else if (valor > max) event.target.value = max;
    else event.target.value = valor;
  }
  fechaActual() {
    let fechaActual = new Date();
    let año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; // Los meses son indexados desde 0, así que sumamos 1
    let dia = fechaActual.getDate();

    let fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
    return fechaFormateada;
  }

  continuar() {
    if (this.credito.monto > 0 && this.credito.plazo > 0) {
      this.credito.fecha_creacion = this.fechaActual();
      this.credito.codTipoCredito = this.tipoCredito.codTipoCredito;
      this.credito.codCliente = "";
      this.flujoDatosService.setCredito(this.credito);
      this.router.navigate(["amortizacion"]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Completar los datos",
        text: "Todos los campos obligatorios deben ser llenados",
        showConfirmButton: false,
        timer: 2500
      });
    }
  }
  regresar() {
    this.router.navigate(["consumo"]);
  }
}

