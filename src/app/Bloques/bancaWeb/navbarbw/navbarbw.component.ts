import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbarbw',
  templateUrl: './navbarbw.component.html',
  styleUrls: ['./navbarbw.component.css']
})
export class NavbarbwComponent implements OnInit {

  nombre: string = '';
  constructor() { }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      //const codCliente = usuario.usuario;
      //const codCliente = ;
      this.nombre = "78836b78e1f268b2709e17c27481866d";
    }
    
  }

}