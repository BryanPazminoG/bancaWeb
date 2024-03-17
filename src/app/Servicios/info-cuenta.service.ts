// info-cuenta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCuentaService {
  private apiKey = 'da94a3ed7cc54b47882d3bf39a236c69';
  private headers = new HttpHeaders().set('Ocp-Apim-Subscription-Key', this.apiKey);
  private infoCuentaApi = "https://banquitoapi.azure-api.net/api/v1/cuentas";

  constructor(private http: HttpClient) { }

  obtenerInfoCuenta(codCuenta: string): Observable<any> {
    const url = `${this.infoCuentaApi}/${codCuenta}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  obtenerInfoCuentaPorCodCuenta(codigoCuenta: any): Observable<any> {
    const url = `${this.infoCuentaApi}/?numeroCuenta=${codigoCuenta}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  actualizarDatosEnCuenta(objetoDatos: any): Observable<any> {
    const url = `${this.infoCuentaApi}`;
    return this.http.put<any>(url, objetoDatos, { headers: this.headers });
  }

}
