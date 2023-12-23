import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tra-exitosa',
  templateUrl: './tra-exitosa.component.html',
  styleUrls: ['./tra-exitosa.component.css']
})
export class TraExitosaComponent {
  constructor(private router: Router) { }
  transferenciaExitosa() {
    
    this.router.navigate(['/confirmacion-transferencia'], );
  }
}
