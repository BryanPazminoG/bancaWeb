import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientesApi = "http://localhost:8081/api/v1/clientes";
  private buscarUsuarioApi = "http://localhost:8080/api/v1/seguridad-cliente"

  constructor(private http: HttpClient) { }

  buscarClientePorParametros(tipo: string, numero: string): Observable<any> {
    let url = `${this.clientesApi}/${tipo}/${numero}`;
    return this.http.get<any>(url);
  }

  buscarClientePorId(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    let url = `${this.clientesApi}/${id}`;
    return this.http.get<any>(url);
  }

  buscarUsuario(idUsuario: number): Observable<any> {
    let url = `${this.buscarUsuarioApi}/${idUsuario}`;
    return this.http.get<any>(url);
  }

}
