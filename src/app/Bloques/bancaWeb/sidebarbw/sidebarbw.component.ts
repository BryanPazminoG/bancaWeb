import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebarbw',
  templateUrl: './sidebarbw.component.html',
  styleUrls: ['./sidebarbw.component.css']
})
export class SidebarbwComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  activeLink: string = ''; // Variable para almacenar el enlace activo

  setActiveLink(link: string): void {
    this.activeLink = link; // Función para establecer el enlace activo
  }
}