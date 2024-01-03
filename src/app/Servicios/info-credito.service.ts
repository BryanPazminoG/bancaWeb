import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCreditoService {

  private infoCreditoApi = "http://34.125.114.60:8080/credito/getbyid";

  constructor(private http: HttpClient) { }


  obtenerInfoCredito(codCredito: string): Observable<any> {
    
    const url = `${this.infoCreditoApi}?id=${codCredito}`;

    return this.http.get<any>(url);
  }
}
