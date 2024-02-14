import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //private autenticarApi = 'http://34.125.230.91:8080/seg-cliente/autenticar';
  private autenticarApi = 'http://localhost:8080/api/v1/seguridad-cliente/sesion';
  private crearUsuarioApi = 'http://localhost:8080/api/v1/seguridadCliente';
  
  
  private actualizarMFAApi = 'http://34.125.230.91:8080/seg-cliente/actualizar-mfa';
  private actualizarContrasenaApi = 'http://34.125.230.91:8080/seg-cliente/actualizar-contrasena'

  constructor(private http: HttpClient) {}

  autenticarUsuario(credenciales: Credenciales): Observable<any> {
    return this.http.post<any>(this.autenticarApi, credenciales);
  }

  actualizarMFA(idCliente: number, nuevoMFA: string): Observable<any> {
    let url = `${this.actualizarMFAApi}/${idCliente}/${nuevoMFA}`;
    return this.http.get<any>(url);
  }

  crearUsuario(usuario: Credenciales): Observable<any> {
    return this.http.post<any>(this.crearUsuarioApi, usuario);
  }

  actualizarContrasena(contrasena: Contrasena): Observable<any> {
    return this.http.put<any>(this.actualizarContrasenaApi, contrasena)
  }
}

export interface Credenciales {
  usuario: string;
  contrasena: string;
}

export interface Usuario {
  codCliente: any;
  usuario: string;
  contrasena: string;
  mfa: string;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
}

export interface Contrasena {
  idCliente: string;
  contrasenaAntigua: string;
  nuevaContrasena: string;
}
