import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { ProductosService } from 'src/app/Servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  cuentasAhorro: any[] = [];
  creditos: any[] = [];
  identificacionCliente: string = "";
  // codigoCliente: string = "386719319965757e39466982091539dd";

  constructor(private productosService: ProductosService,
    private flujoDatosService: FlujoDatosService,
    private serviceCliente: ClienteService  
  ) { }

  ngOnInit(): void {
    this.obtenerCuentasAhorro(1);
    this.obtenerCreditos(1);
    const usuario = this.flujoDatosService.getUsuarioLogin()
    console.log("USUARIO", usuario);
  }

  obtenerCuentasAhorro(codCliente: number) {
    this.productosService.obtenerCuentasAhorro(codCliente).subscribe(
      (data) => {
        this.cuentasAhorro = data;
      },
      (error) => {
        console.error('Error obteniendo cuentas de ahorro', error);
      }
    );
  }

  obtenerCreditos(codCliente: number) {
    this.productosService.obtenerCreditos(codCliente).subscribe(
      (data) => {
        console.log("CREDITOS", data)
        this.creditos = data;
      },
      (error) => {
        console.error('Error obteniendo créditos', error);
      }
    );
  }

}


