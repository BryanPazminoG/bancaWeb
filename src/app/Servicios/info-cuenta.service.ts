// info-cuenta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCuentaService {
  private infoClienteCuentaApi = "http://34.125.120.215:8080/cuenta/getbyid";
  private infoCuentaByCodCuentaApi = "http://34.125.120.215:8080/cuenta/buscar";
  private actualizarDatosCuenta = "http://34.125.120.215:8080/cuenta/update";

  constructor(private http: HttpClient) { }

  obtenerInfoCuenta(codCuenta: string): Observable<any> {
    const url = `${this.infoClienteCuentaApi}/${codCuenta}`;
    return this.http.get<any>(url);
  }

  obtenerInfoCuentaPorCodCuenta(codigoCuenta: any): Observable<any> {
    const url = `${this.infoCuentaByCodCuentaApi}/${codigoCuenta}`;
    return this.http.get<any>(url);
  }

  actualizarDatosEnCuenta(objetoDatos: any): Observable<any> {
    const url = `${this.actualizarDatosCuenta}`;
    return this.http.put<any>(url, objetoDatos);
  }

}
