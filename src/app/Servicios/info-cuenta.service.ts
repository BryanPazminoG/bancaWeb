// info-cuenta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCuentaService {
  private infoCuentaApi = "http://34.125.120.215:8080/cuenta/getbyid";

  constructor(private http: HttpClient) { }

  obtenerInfoCuenta(codCuenta: string): Observable<any> {
    const url = `${this.infoCuentaApi}/${codCuenta}`;
    return this.http.get<any>(url);
  }
}
