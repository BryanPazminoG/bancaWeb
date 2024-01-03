// perfil.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlujoDatosService } from './flujo-datos.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private perfilApiBase = "http://34.102.85.160:8080/cliente/buscar-cliente";

  constructor(private http: HttpClient, private flujoDatosService: FlujoDatosService) { }

  obtenerDatosPerfil(): Observable<any> {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      const codCliente = usuario.codCliente;
      console.log(codCliente); // Esto mostrará el codCliente en la consola
      const perfilApi = `${this.perfilApiBase}?id=${codCliente}`;
      return this.http.get<any>(perfilApi);
    } else {
      // Si no se encuentra ningún usuario en el LocalStorage, se devuelve un observable vacío o se maneja según tu lógica
      return new Observable<any>((observer) => {
        observer.error('No se encontró ningún usuario en el LocalStorage');
      });
    }
  }

  

}
