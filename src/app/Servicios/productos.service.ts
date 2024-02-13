import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private cuentasAhorroApi = 'http://34.176.119.102:9090/api/v1/cuentas/clientes/';
  private creditosApi = 'http://34.176.119.102:9090/api/v1/creditos/clientes/';

  constructor(private http: HttpClient) { }

  obtenerCuentasAhorro(idCliente: string): Observable<any> {
    const url = `${this.cuentasAhorroApi}${idCliente}`;
    return this.http.get<any>(url);
  }

  obtenerCreditos(codCliente: number): Observable<any> {
    const url = `${this.creditosApi}${codCliente}`;
    return this.http.get<any>(url);
  }
}
