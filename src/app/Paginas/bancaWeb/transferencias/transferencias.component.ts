import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent {
  constructor(private router: Router) { }

  confirmarTransferencia() {
  
    this.router.navigate(['/confirmacion-transferencia']);
  }
}
