import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiKey = 'da94a3ed7cc54b47882d3bf39a236c69';
  private headers = new HttpHeaders().set('Ocp-Apim-Subscription-Key', this.apiKey);

  private cuentasAhorroApi = "https://banquitoapi.azure-api.net/api/v1/cuentas/clientes/";
  private creditosApi = " https://creditos-atnhilz3dq-uc.a.run.app/api/v1/creditos/clientes/";

  constructor(private http: HttpClient) { }

  obtenerCuentasAhorro(codCliente: number): Observable<any> {
    const url = `${this.cuentasAhorroApi}${codCliente}`;
    return this.http.get<any>(url, { headers: this.headers });
  }
  

  obtenerCreditos(codCliente: number): Observable<any> {
    const url = `${this.creditosApi}${codCliente.toString()}`;
    return this.http.get<any>(url, { headers: this.headers });
  }
}
