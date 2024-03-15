import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private cuentasAhorroApi = "http://35.232.62.178:8080/api/v1/cuentas/clientes/";
  private creditosApi = " http://34.72.172.227:8080/api/v1/creditos/clientes/";

  constructor(private http: HttpClient) { }

  obtenerCuentasAhorro(codCliente: number): Observable<any> {
    const url = `${this.cuentasAhorroApi}${codCliente}`;
    return this.http.get<any>(url);
  }
  

  obtenerCreditos(codCliente: number): Observable<any> {
    const url = `${this.creditosApi}${codCliente.toString()}`;
    return this.http.get<any>(url);
  }

}
