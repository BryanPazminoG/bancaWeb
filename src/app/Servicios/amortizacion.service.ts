import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmortizacionService {

  private amortizacionApi = "http://34.72.172.227:8080/creditotablapagos/tabla-amortizacion";

  constructor(private http: HttpClient) { }

  obtenerTablaAmortizacion(codCredito: string): Observable<any[]> {
    const apiUrl = `${this.amortizacionApi}?codCredito=${codCredito}`;
    return this.http.get<any[]>(apiUrl);
  }

}
