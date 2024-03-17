// perfil.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlujoDatosService } from './flujo-datos.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private perfilApiBase = "http://34.123.168.16:8080/api/v1/clientes/naturales";

  constructor(private http: HttpClient, private flujoDatosService: FlujoDatosService) { }

  obtenerDatosPerfil(): Observable<any> {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      const codCliente = usuario.codCliente;
      console.log(codCliente); // Esto mostrará el codCliente en la consola
      const perfilApi = `${this.perfilApiBase}/${codCliente}`;
      return this.http.get<any>(perfilApi);
    } else {
      // Si no se encuentra ningún usuario en el LocalStorage, se devuelve un observable vacío o se maneja según tu lógica
      return new Observable<any>((observer) => {
        observer.error('No se encontró ningún usuario en el LocalStorage');
      });
    }
  }

  

}
