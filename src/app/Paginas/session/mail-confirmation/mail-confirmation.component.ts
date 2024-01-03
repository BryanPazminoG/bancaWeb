import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mail-confirmation',
  templateUrl: './mail-confirmation.component.html',
  styleUrls: ['./mail-confirmation.component.css']
})
export class MailConfirmationComponent {
  codigo: string = '';
  codigoReal: string = '';

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
      Swal.fire({
        title: 'Codigo Correcto',
        
        icon: "success"
      });
      // alert("Codigo correcto");
      this.goToRegister();
    }else{
      Swal.fire({
        title: 'Codigo incorrectos',
        text: 'Verifique que el número sea el correcto',
        icon: 'error'
      });
      // alert("Codigo incorrecto");
    }
  }

  validateInputCodigo(event: KeyboardEvent | ClipboardEvent): void {
    let key;
  
    if (event.type === 'paste') {
      key = (event as ClipboardEvent).clipboardData?.getData('text/plain') || '';
    } else {
      key = (event as KeyboardEvent).key || String.fromCharCode((event as KeyboardEvent).keyCode);
    }
  
    const regex = /[0-9]|\./;
  
    if (!regex.test(key)) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (event.returnValue !== undefined) {
        (event as any).returnValue = false;
      }
    }
  }

}
