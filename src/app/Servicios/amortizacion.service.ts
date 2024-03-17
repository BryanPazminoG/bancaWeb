import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmortizacionService {

  private amortizacionApi = "https://creditos-atnhilz3dq-uc.a.run.app/creditotablapagos/tabla-amortizacion";

  constructor(private http: HttpClient) { }

  obtenerTablaAmortizacion(codCredito: string): Observable<any[]> {
    const apiUrl = `${this.amortizacionApi}?codCredito=${codCredito}`;
    return this.http.get<any[]>(apiUrl);
  }

}
