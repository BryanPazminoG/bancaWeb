import { Component, OnInit } from '@angular/core';
import { AmortizacionService } from 'src/app/Servicios/amortizacion.service';

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrls: ['./amortizacion.component.css']
})
export class AmortizacionComponent implements OnInit {

  tablaAmortizacion: any[] = [];

  constructor(private amortizacionService: AmortizacionService) { }

  ngOnInit(): void {
    this.obtenerTablaAmortizacion();
  }

  obtenerTablaAmortizacion() {
    this.amortizacionService.obtenerTablaAmortizacion().subscribe(
      (data) => {
        this.tablaAmortizacion = data;
      },
      (error) => {
        console.error('Error obteniendo tabla de amortización', error);
      }
    );
  }
}