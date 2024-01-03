import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmortizacionService } from 'src/app/Servicios/amortizacion.service';

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrls: ['./amortizacion.component.css']
})
export class AmortizacionComponent implements OnInit {

  tablaAmortizacion: any[] = [];
  codCredito: string = ''; 

  constructor(
    private amortizacionService: AmortizacionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.codCredito = params['id'];
     
      this.obtenerTablaAmortizacion();
    });
  }

  obtenerTablaAmortizacion() {
    // Ahora puedes pasar el código de crédito al servicio
    this.amortizacionService.obtenerTablaAmortizacion(this.codCredito).subscribe(
      (data) => {
        this.tablaAmortizacion = data;
      },
      (error) => {
        console.error('Error obteniendo tabla de amortización', error);
      }
    );
  }
}
