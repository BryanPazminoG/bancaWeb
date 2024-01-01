import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoCreditoService } from 'src/app/Servicios/info-credito.service';

@Component({
  selector: 'app-info-credito',
  templateUrl: './info-credito.component.html',
  styleUrls: ['./info-credito.component.css']
})
export class InfoCreditoComponent implements OnInit {

  infoCredito: any = {};
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
      },
      (error) => {
        console.error('Error obteniendo información del crédito', error);
      }
    );
  }
}
