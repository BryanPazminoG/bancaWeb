import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private cuentasAhorroApi = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/cuentas/clientes/";
  private creditosApi = " https://creditos-atnhilz3dq-uc.a.run.app/api/v1/creditos/clientes/";

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
