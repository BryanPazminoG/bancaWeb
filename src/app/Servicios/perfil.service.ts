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
   
    const codCliente = this.flujoDatosService.getUsuarioLogin().codCliente;
    const perfilApi = `${this.perfilApiBase}?id=${codCliente}`;
    return this.http.get<any>(perfilApi);
  }

}
