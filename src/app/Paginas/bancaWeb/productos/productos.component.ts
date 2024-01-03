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
    this.obtenerCuentasAhorro();
    this.obtenerCreditos();
    const usuario = this.flujoDatosService.getUsuarioLogin()
    console.log("USUARIO", usuario);
  }

  obtenerCuentasAhorro() {
    this.productosService.obtenerCuentasAhorro().subscribe(
      (data) => {
        this.cuentasAhorro = data;
      },
      (error) => {
        console.error('Error obteniendo cuentas de ahorro', error);
      }
    );
  }

  obtenerCreditos() {
    this.productosService.obtenerCreditos().subscribe(
      (data) => {
        this.creditos = data;
      },
      (error) => {
        console.error('Error obteniendo créditos', error);
      }
    );
  }

}


