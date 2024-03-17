import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //private autenticarApi = 'http://34.125.230.91:8080/seg-cliente/autenticar';
  private autenticarApi = 'https://seguridadclientes-clientes-atnhilz3dq-uc.a.run.app/api/v1/seguridad-cliente/sesion';
  private crearUsuarioApi = 'https://seguridadclientes-clientes-atnhilz3dq-uc.a.run.app/api/v1/seguridad-cliente';
  
  private actualizarMFAApi = 'https://seguridadclientes-clientes-atnhilz3dq-uc.a.run.app/api/v1/seguridad-cliente/actualizar-mfa';
  private actualizarContrasenaApi = 'https://seguridadclientes-clientes-atnhilz3dq-uc.a.run.app/api/v1/seguridad-cliente'

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

  actualizarContrasena(contrasena: Credenciales): Observable<any> {
    return this.http.put<any>(this.actualizarContrasenaApi, contrasena)
  }
}

export interface Credenciales {
  nombreUsuario: string;
  clave: string;
}

export interface CodigoVerificacion {
  codigo: string,
  fechaCreacion: Date,
  estado: string
}

export interface Permisos {
  cuentas: string[];
  creditos: string[];
  tarjetas: string[];
}

export interface Usuario {
  codCliente: any;
  nombreUsuario: string;
  clave: string;
  estado: string;
  fechaUltimoAcceso: Date;
  tipoCliente: string;
  codigoverificacion: CodigoVerificacion;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
  permisos: Permisos
}

