import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

<<<<<<< HEAD
  private cuentasAhorroApi = 'http://34.176.119.102:9090/api/v1/cuentas/clientes/';
  private creditosApi = 'http://34.176.119.102:9090/api/v1/creditos/clientes/';
=======
  private cuentasAhorroApi = 'http://35.192.152.130:8089/api/v1/cuentas/clientes/';
  private creditosApi = 'http://34.125.114.60:8080/credito/buscar-codigo-cliente';
>>>>>>> f040000bcc7d5248eceeb00ebe2b7509f0ec29a3

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
