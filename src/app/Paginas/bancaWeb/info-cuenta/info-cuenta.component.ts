import { Component, OnInit } from '@angular/core';
import { InfoCuentaService } from 'src/app/Servicios/info-cuenta.service';

@Component({
  selector: 'app-info-cuenta',
  templateUrl: './info-cuenta.component.html',
  styleUrls: ['./info-cuenta.component.css']
})
export class InfoCuentaComponent implements OnInit {

  infoCuenta: any = {};

  constructor(private infoCuentaService: InfoCuentaService) { }

  ngOnInit(): void {
    this.obtenerInfoCuenta();
  }

  obtenerInfoCuenta() {
    this.infoCuentaService.obtenerInfoCuenta().subscribe(
      (data) => {
        this.infoCuenta = data;
      },
      (error) => {
        console.error('Error obteniendo información de cuenta', error);
      }
    );
  }
}