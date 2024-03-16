import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private buscarClienteApi = "http://34.123.168.16:8080/api/v1/clientes/naturales/";
  private buscarClientePorIdApi = "http://34.123.168.16:8080/api/v1/clientes/naturales";
  private buscarUsuarioApi = "http://34.123.168.16:8080/seg-cliente/clientes"

  constructor(private http: HttpClient) { }

  buscarClientePorParametros(tipo: string, numero: string): Observable<any> {
    return this.http.get<any>(this.buscarClienteApi + tipo + "/" + numero);
  }

  buscarClientePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.buscarClientePorIdApi}/${id}`);
  }

  buscarUsuario(idUsuario: number): Observable<any> {
    let url = `${this.buscarUsuarioApi}/${idUsuario}`;
    return this.http.get<any>(url);
  }

}
