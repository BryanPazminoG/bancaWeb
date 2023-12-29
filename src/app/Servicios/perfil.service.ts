// perfil.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private perfilApi = "http://localhost:8080/perfil/perfil";

  constructor(private http: HttpClient) { }

  obtenerDatosPerfil(): Observable<any> {
    
    return this.http.get<any>(this.perfilApi);
  }

}
