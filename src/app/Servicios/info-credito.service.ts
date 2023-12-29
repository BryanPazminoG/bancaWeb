import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCreditoService {

  private infoCreditoApi = "http://localhost:8080/info-credito/info-credito";

  constructor(private http: HttpClient) { }

  obtenerInfoCredito(): Observable<any> {
   
    return this.http.get<any>(this.infoCreditoApi);
  }

 
}