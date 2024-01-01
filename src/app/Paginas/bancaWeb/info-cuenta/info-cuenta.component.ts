// info-cuenta.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoCuentaService } from 'src/app/Servicios/info-cuenta.service';

@Component({
  selector: 'app-info-cuenta',
  templateUrl: './info-cuenta.component.html',
  styleUrls: ['./info-cuenta.component.css']
})
export class InfoCuentaComponent implements OnInit {
  infoCuenta: any = {};
  codCuenta: string = '';

  constructor(private infoCuentaService: InfoCuentaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtén el idCuenta de los parámetros de la URL
    this.codCuenta = this.route.snapshot.params['id'];
    // Llama al método para obtener la información de la cuenta
    this.obtenerInfoCuenta();
  }

  obtenerInfoCuenta() {
    // Utiliza el idCuenta para obtener la información correcta
    this.infoCuentaService.obtenerInfoCuenta(this.codCuenta).subscribe(
      (data) => {
        this.infoCuenta = data;
      },
      (error) => {
        console.error('Error obteniendo información de cuenta', error);
      }
    );
  }
}
