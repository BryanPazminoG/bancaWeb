import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private buscarClientePorIdApi = "http://34.102.85.160:8080/cliente/buscar-cliente";
  private buscarUsuarioApi = "http://34.125.230.91:8080/seg-cliente/clientes"
  private buscarClienteApi = "http://35.192.130.249:8081/api/v1/clientes/";

  constructor(private http: HttpClient) { }

  buscarClientePorParametros(tipo: string, numero: string): Observable<any> {
    return this.http.get<any>(this.buscarClienteApi + tipo + "/" + numero);
  }

  buscarClientePorId(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<any>(`${this.buscarClientePorIdApi}?id=${id}`);
  }

  buscarUsuario(idUsuario: number): Observable<any> {
    let url = `${this.buscarUsuarioApi}/${idUsuario}`;
    return this.http.get<any>(url);
  }

}
