// movimientos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private apiKey = 'da94a3ed7cc54b47882d3bf39a236c69';
  private headers = new HttpHeaders().set('Ocp-Apim-Subscription-Key', this.apiKey);

  private movimientosApi = "https://banquitoapi.azure-api.net/api/v1/transacciones/cuentas";

  constructor(private http: HttpClient) { }

  obtenerMovimientosCuenta(codCuenta: string): Observable<any[]> {
    const url = `${this.movimientosApi}/${codCuenta}`;
    return this.http.get<any[]>(url, { headers: this.headers });
  }


}
