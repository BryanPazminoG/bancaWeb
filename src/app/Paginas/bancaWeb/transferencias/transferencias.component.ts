// componentes/transferencias/transferencias.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { TransferenciasService } from 'src/app/Servicios/transferencias.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {
  transferencia: any = {};
  cuentas: any[] = []; // Usamos un arreglo de objetos para las cuentas

  constructor(
    private router: Router,
    private transferenciasService: TransferenciasService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.obtenerCuentasAhorro();
  }

  validateFormatCuenta(event: KeyboardEvent | ClipboardEvent): void {
    let key;

    if (event.type === 'paste') {
      key = (event as ClipboardEvent).clipboardData?.getData('text/plain') || '';
    } else {
      key = (event as KeyboardEvent).key || String.fromCharCode((event as KeyboardEvent).keyCode);
    }

    const regex = /[0-9]|\./;

    if (!regex.test(key)) {
      event.preventDefault?.();
      (event as any).returnValue = false;
    }
  }

  validateFormatNombre(event: KeyboardEvent | ClipboardEvent): void {
    let key;

    if (event.type === 'paste') {
      key = (event as ClipboardEvent).clipboardData?.getData('text/plain') || '';
    } else {
      key = (event as KeyboardEvent).key || String.fromCharCode((event as KeyboardEvent).keyCode);
    }

    const regex = /[a-zA-Z]/;

    if (!regex.test(key)) {
      event.preventDefault?.();
      (event as any).returnValue = false;
    }
  }

  obtenerCuentasAhorro() {
    this.productosService.obtenerCuentasAhorro().subscribe(
      (data) => {
        this.cuentas = data;
      },
      (error) => {
        console.error('Error obteniendo cuentas de ahorro', error);
      }
    );
  }

  confirmarTransferencia() {
    this.transferenciasService.realizarTransferencia(this.transferencia).subscribe(
      (data) => {
        console.log('Transferencia realizada con éxito', data);
        this.router.navigate(['/confirmacion-transferencia']);
      },
      (error) => {
        console.error('Error al realizar la transferencia', error);
      }
    );
  }

  limpiarFormulario(form: any) {
    form.resetForm();
  }
}