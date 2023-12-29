// amortizacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmortizacionService {

  private amortizacionApi = "http://localhost:8080/amortizacion/amortizacion";

  constructor(private http: HttpClient) { }

  obtenerTablaAmortizacion(): Observable<any[]> {
    
    return this.http.get<any[]>(this.amortizacionApi);
  }

}
