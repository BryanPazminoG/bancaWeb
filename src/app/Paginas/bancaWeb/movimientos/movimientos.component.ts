// movimientos.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovimientosService } from 'src/app/Servicios/movimientos.service';


@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  movimientos: any[] = [];
  codCuenta: string = ''; // Inicializar la propiedad aquí

  constructor(private movimientosService: MovimientosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.codCuenta = this.route.snapshot.params['id'];
    this.obtenerMovimientosCuenta();
  }

  obtenerMovimientosCuenta() {
    this.movimientosService.obtenerMovimientosCuenta(this.codCuenta).subscribe(
      (data) => {
        this.movimientos = data;
      },
      (error) => {
        console.error('Error obteniendo movimientos de cuenta', error);
      }
    );
  }
}