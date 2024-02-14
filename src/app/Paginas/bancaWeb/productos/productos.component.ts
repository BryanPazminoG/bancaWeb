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
    const usuarioLoggeado = localStorage.getItem('usuario');
    
    if (usuarioLoggeado) {
      const usuario = JSON.parse(usuarioLoggeado);
      const codCliente = usuario.codCliente;
      this.getClienteP(codCliente)
      console.log(codCliente);
      this.obtenerCuentasAhorro(codCliente);      
    }
  }

  getClienteP(codCliente:String) {
    this.serviceCliente.buscarClientePorId(codCliente).subscribe(
      (data) => {
        this.identificacionCliente = data.numeroIdentificacion
        this.obtenerCreditos(this.identificacionCliente);
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }

  obtenerCuentasAhorro(codCliente: string) {
    console.log(codCliente);
    this.productosService.obtenerCuentasAhorro(codCliente).subscribe(
      (data) => {
        this.cuentasAhorro = data;
      },
      (error) => {
        console.error('Error obteniendo cuentas de ahorro', error);
      }
    );
  }

  obtenerCreditos(codCliente: any) {
    console.log(codCliente);
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


