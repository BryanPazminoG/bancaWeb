// info-cuenta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCuentaService {
  private infoCuentaApi = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/cuentas";

  constructor(private http: HttpClient) { }

  obtenerInfoCuenta(codCuenta: string): Observable<any> {
    const url = `${this.infoCuentaApi}/${codCuenta}`;
    return this.http.get<any>(url);
  }

  obtenerInfoCuentaPorCodCuenta(codigoCuenta: any): Observable<any> {
    const url = `${this.infoCuentaApi}/?numeroCuenta=${codigoCuenta}`;
    return this.http.get<any>(url);
  }

  actualizarDatosEnCuenta(objetoDatos: any): Observable<any> {
    const url = `${this.infoCuentaApi}`;
    return this.http.put<any>(url, objetoDatos);
  }

}
