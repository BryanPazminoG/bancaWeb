import { Component, OnInit } from '@angular/core';
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

  constructor(private productosService: ProductosService,
    private flujoDatosService: FlujoDatosService  
  ) { }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      const codCliente = usuario.codCliente;
      console.log(codCliente); // Esto mostrará el codCliente en la consola
      this.obtenerCuentasAhorro(codCliente);
      this.obtenerCreditos(codCliente);
    }

  }

  obtenerCuentasAhorro(codCliente: any) {
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
    this.productosService.obtenerCreditos(codCliente).subscribe(
      (data) => {
        this.creditos = data;
      },
      (error) => {
        console.error('Error obteniendo créditos', error);
      }
    );
  }

}


