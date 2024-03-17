// perfil.component.ts
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/Servicios/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  datosPerfil: any = {};
  ultimoIngreso = this.formatDate(new Date()) ;

  constructor(private router: Router, private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.obtenerDatosPerfil();
  }

  obtenerDatosPerfil() {
    this.perfilService.obtenerDatosPerfil().subscribe(
      (data) => {
        this.datosPerfil = data;
        console.log('PERFIL', this.datosPerfil);
      },
      (error) => {
        console.error('Error obteniendo datos de perfil', error);
      }
    );
  }

  pad(number: number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  // Función para formatear la fecha en el formato deseado
  formatDate(date: Date) {
    const day = this.pad(date.getDate());
    const month = this.pad(date.getMonth() + 1); // ¡Ojo! getMonth() devuelve 0 para enero, 1 para febrero, etc.
    const year = date.getFullYear();
    const hours = this.pad(date.getHours());
    const minutes = this.pad(date.getMinutes());

    return `${day}/${month}/${year} a las ${hours}:${minutes}`;
  }
}
