// info-cuenta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCuentaService {

  private infoCuentaApi = "http://localhost:8080/info-cuenta/info-cuenta";

  constructor(private http: HttpClient) { }

  obtenerInfoCuenta(): Observable<any> {
   
    return this.http.get<any>(this.infoCuentaApi);
  }

}
