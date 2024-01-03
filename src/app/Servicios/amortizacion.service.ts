// amortizacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmortizacionService {

  private amortizacionApi = "http://34.125.114.60:8080/amortizacion/amortizacion";

  constructor(private http: HttpClient) { }

  obtenerTablaAmortizacion(): Observable<any[]> {
    
    return this.http.get<any[]>(this.amortizacionApi);
  }

}
