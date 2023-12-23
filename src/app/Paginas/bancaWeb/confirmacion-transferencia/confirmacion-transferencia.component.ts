import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion-transferencia',
  templateUrl: './confirmacion-transferencia.component.html',
  styleUrls: ['./confirmacion-transferencia.component.css']
})

export class ConfirmacionTransferenciaComponent {
  
  constructor(private router: Router) { }

  transferenciaExitosa() {
   
    this.router.navigate(['/tra-exitosa']);
  }
  
  
  
}
