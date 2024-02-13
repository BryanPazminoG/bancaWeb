import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private cuentasAhorroApi = 'http://35.192.152.130:8089/api/v1/cuentas/clientes/';
  private creditosApi = 'http://34.125.114.60:8080/credito/buscar-codigo-cliente';

  constructor(private http: HttpClient) { }

  obtenerCuentasAhorro(idCliente: string): Observable<any> {
    const url = `${this.cuentasAhorroApi}${idCliente}`;
    return this.http.get<any>(url);
  }

  obtenerCreditos(codCliente: number): Observable<any> {
    const url = `${this.creditosApi}`;
    const params = new HttpParams().set('codCliente', codCliente.toString());
    return this.http.get<any>(url, { params });
  }
}
