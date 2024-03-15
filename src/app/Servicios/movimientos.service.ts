// movimientos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private movimientosApi = "http://35.232.62.178:8080/api/v1/transacciones/cuentas";

  constructor(private http: HttpClient) { }

  obtenerMovimientosCuenta(codCuenta: string): Observable<any[]> {
    const url = `${this.movimientosApi}/${codCuenta}`;
    return this.http.get<any[]>(url);
  }


}
