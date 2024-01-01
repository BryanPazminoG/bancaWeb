import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private autenticarApi = 'http://34.125.230.91:8080/seg-cliente/autenticar';

  constructor(private http: HttpClient) {}

  autenticarUsuario(credenciales: Credenciales): Observable<any> {
    return this.http.post<any>(this.autenticarApi, credenciales);
  }
}

export interface Credenciales {
  usuario: string;
  contrasena: string;
}
