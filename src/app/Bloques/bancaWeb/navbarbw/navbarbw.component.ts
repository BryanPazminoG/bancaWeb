import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/Servicios/cliente.service';

@Component({
  selector: 'app-navbarbw',
  templateUrl: './navbarbw.component.html',
  styleUrls: ['./navbarbw.component.css']
})
export class NavbarbwComponent implements OnInit {

  nombre: string = '';
  constructor(private serviceCliente: ClienteService) { }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('codigoCliente');
    if (usuarioGuardado) {
      this.getClienteP(usuarioGuardado);
    }
    
  }

  getClienteP(codCliente:String) {
    this.serviceCliente.buscarClientePorId(codCliente).subscribe(
      (data) => {
        if (data) {
          this.nombre = data.nombres + " " + data.apellidos;
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }

}