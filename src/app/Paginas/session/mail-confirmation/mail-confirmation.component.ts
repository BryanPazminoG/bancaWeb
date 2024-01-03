import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';

@Component({
  selector: 'app-mail-confirmation',
  templateUrl: './mail-confirmation.component.html',
  styleUrls: ['./mail-confirmation.component.css']
})
export class MailConfirmationComponent {
  codigo: string = '';
  codigoReal: string = '';
  isNew: boolean = this.flujoDatosService.getIsNew();

  constructor(private router: Router,
    private flujoDatosService: FlujoDatosService,
  ) { }

  returnToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  validarCodigo(): void {
    this.codigoReal = this.flujoDatosService.getCodigo()
    if(this.codigoReal===this.codigo){
      this.goToRegister();
    }else{
      alert("Codigo incorrecto");
    }
  }

}
