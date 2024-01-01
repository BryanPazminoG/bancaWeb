// movimientos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private movimientosApi = "http://localhost:8080/transaccion/obtener-transacciones/1";

  constructor(private http: HttpClient) { }

  obtenerMovimientosCuenta(idCuenta: string): Observable<any[]> {
    const url = `${this.movimientosApi}/${idCuenta}`;
    return this.http.get<any[]>(url);
  }


}
