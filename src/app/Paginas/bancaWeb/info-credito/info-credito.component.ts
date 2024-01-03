import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoCreditoService } from 'src/app/Servicios/info-credito.service';

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

  constructor(private infoCreditoService: InfoCreditoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.codCredito = this.route.snapshot.params['id'];
    this.obtenerInfoCredito();
    
  }

  obtenerInfoCredito() {
    this.infoCreditoService.obtenerInfoCredito(this.codCredito).subscribe(
      (data) => {
        this.infoCredito = data;
        this.obtenerInfoAdicional();
      },
      (error) => {
        console.error('Error obteniendo información del crédito', error);
      }
    );
  }

  obtenerInfoAdicional() {
    this.infoCreditoService.obtenerInfoAdicional(this.codCredito).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.infoAdicional = data[data.length - 1];
          const plazoTotal = this.infoAdicional.credito.plazo;
          const pagosRealizados = data.filter((pago: any) => pago.estado === 'PAG').length;
          this.infoCredito.cadenaPagos = `${pagosRealizados}/${plazoTotal}`;
        }
      },
      (error) => {
        console.error('Error obteniendo información adicional', error);
      }
    );
  }
  

  mostrarTablaAmortizacion() {
    this.verTablaAmortizacion.emit(this.codCredito);
  }

}
