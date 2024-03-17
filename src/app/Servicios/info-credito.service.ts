import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCreditoService {

  private infoCreditoApi = "https://creditos-atnhilz3dq-uc.a.run.app/credito/getbyid";
  private infoAdicionalCreditoApi = "https://creditos-atnhilz3dq-uc.a.run.app/creditotablapagos/pagos-realizados"
  constructor(private http: HttpClient) { }


  obtenerInfoCredito(codCredito: string): Observable<any> {
    
    const url = `${this.infoCreditoApi}?id=${codCredito}`;

    return this.http.get<any>(url);
  }

  obtenerInfoAdicional(codCredito: string): Observable<any> {
    const url = `${this.infoAdicionalCreditoApi}?codCredito=${codCredito}`;
    return this.http.get<any>(url);
  }
  
}
