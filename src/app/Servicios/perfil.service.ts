// perfil.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private perfilApi = "http://34.29.239.225:8080/cliente/buscar-cliente?id=1";


  constructor(private http: HttpClient) { }

  obtenerDatosPerfil(): Observable<any> {
    
    return this.http.get<any>(this.perfilApi);
  }

}
