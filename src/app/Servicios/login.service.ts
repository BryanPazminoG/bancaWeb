import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private autenticarApi = 'http://34.125.230.91:8080/seg-cliente/autenticar';
  private actualizarMFAApi = 'http://34.125.230.91:8080/seg-cliente/actualizar-mfa';
  private crearUsuarioApi = 'http://34.125.230.91:8080/crear';

  constructor(private http: HttpClient) {}

  autenticarUsuario(credenciales: Credenciales): Observable<any> {
    return this.http.post<any>(this.autenticarApi, credenciales);
  }

  actualizarMFA(idCliente: number, nuevoMFA: string): Observable<any> {
    let url = `${this.actualizarMFAApi}/${idCliente}/${nuevoMFA}`;
    return this.http.get<any>(url);
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.crearUsuarioApi, usuario);
  }
}

export interface Credenciales {
  usuario: string;
  contrasena: string;
}

export interface Usuario {
  usuario: string;
  contrasena: string;
  mfa: string;
  fechaCreacion: string;
  fechaUltimaModificacion: string;
}
