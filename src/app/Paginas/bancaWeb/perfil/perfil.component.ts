// perfil.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/Servicios/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  datosPerfil: any = {};

  constructor(private router: Router, private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.obtenerDatosPerfil();
  }

  obtenerDatosPerfil() {
    this.perfilService.obtenerDatosPerfil().subscribe(
      (data) => {
        this.datosPerfil = data;
        console.log("PERFIL", this.datosPerfil)
      },
      (error) => {
        console.error('Error obteniendo datos de perfil', error);
      }
    );
  }
}
