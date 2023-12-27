import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent {
  constructor(private router: Router) { }

  generarTarjeta() {
   
    this.router.navigate(['/tarjeta-gen']);
  }
}
