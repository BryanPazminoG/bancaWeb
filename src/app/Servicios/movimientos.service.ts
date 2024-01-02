// movimientos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private movimientosApi = "http://34.125.120.215:8080/transaccion/obtener-transacciones/3";

  constructor(private http: HttpClient) { }

  obtenerMovimientosCuenta(codCuenta: string): Observable<any[]> {
    const url = `${this.movimientosApi}/${codCuenta}`;
    return this.http.get<any[]>(url);
  }


}
