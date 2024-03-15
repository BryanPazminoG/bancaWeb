import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { TarjetaService } from 'src/app/Servicios/tarjeta.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  cuentasAhorro: any[] = [];
  cuentaId: string = '';
  codigoCliente: string = '';

  constructor(private router: Router, private productosService: ProductosService, private tarjetaService: TarjetaService) { }

  ngOnInit(): void {
    this.obtenerCuentasAhorro(1);
  }

  obtenerCuentasAhorro(codCliente: number) {
    this.productosService.obtenerCuentasAhorro(codCliente).subscribe(
      (data) => {
        this.cuentasAhorro = data;
        //this.cuentaId=data.
      },
      (error) => {
        console.error('Error obteniendo cuentas de ahorro', error);
      }
    );
  }

  generarTarjeta() {
    if (this.cuentaId) {
      const nuevaTarjeta = {
        codCuenta: parseInt(this.cuentaId), 
        numero: this.generarNumeroAleatorio(16),
        fechaVencimiento: this.generarFechaVencimiento(),
        cvc: this.generarNumeroAleatorio(3),
        pin: this.generarNumeroAleatorio(4),
        tipoTarjeta: "DEB", // Asigna el tipo de tarjeta según corresponda
        redPago: "VIS" // Asigna la red de pago según corresponda
      };
      console.log("Nueva tarjeta es:", nuevaTarjeta);
      

      this.tarjetaService.generarTarjeta(nuevaTarjeta).subscribe(
        (data) => {
          console.log('Tarjeta generada correctamente', data);
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Tarjeta generada correctamente. Numero:   \n"+nuevaTarjeta.numero +"\n CVC: "+nuevaTarjeta.cvc + "\n pin: "+nuevaTarjeta.pin +"\n Fecha Vencimiento: "+ nuevaTarjeta.fechaVencimiento.substring(0, 10),
            
          });      
        },
        (error) => {
          console.error('Error generando tarjeta', error);
        }
      );
    } else {
      console.warn('Selecciona una cuenta antes de continuar');
    }
  }

  generarNumeroAleatorio(longitud: number): string {
    let numero = '';
    for (let i = 0; i < longitud; i++) {
      numero += Math.floor(Math.random() * 10).toString();
    }
    return numero;
  }

  generarFechaVencimiento(): string {
    const fechaActual = new Date();
    const maxYear = fechaActual.getFullYear() + 4;
    const year = Math.floor(Math.random() * (maxYear - fechaActual.getFullYear())) + fechaActual.getFullYear();
    const month = Math.floor(Math.random() * 12) + 1;
    return `${year}-${month < 10 ? '0' : ''}${month}-01T00:00:00.000+00:00`;
  }

  cancelar() {
    
    this.router.navigate(['/otra-ruta']);
  }
  volver() {
    this.router.navigate(['/productos']);
  }
}