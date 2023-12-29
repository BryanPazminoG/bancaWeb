import { Component, OnInit } from '@angular/core';
import { InfoCreditoService } from 'src/app/Servicios/info-credito.service';

@Component({
  selector: 'app-info-credito',
  templateUrl: './info-credito.component.html',
  styleUrls: ['./info-credito.component.css']
})
export class InfoCreditoComponent implements OnInit {

  infoCredito: any = {};

  constructor(private infoCreditoService: InfoCreditoService) { }

  ngOnInit(): void {
    this.obtenerInfoCredito();
  }

  obtenerInfoCredito() {
    this.infoCreditoService.obtenerInfoCredito().subscribe(
      (data) => {
        this.infoCredito = data;
      },
      (error) => {
        console.error('Error obteniendo información del crédito', error);
      }
    );
  }
}
