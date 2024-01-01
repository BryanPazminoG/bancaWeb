import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCreditoService {

  // Cambiar la URL para apuntar al servidor correcto
  private infoCreditoApi = "http://34.125.114.60:8080/credito/getbyid";

  constructor(private http: HttpClient) { }

  // Modificar el método para aceptar un parámetro (id del crédito)
  obtenerInfoCredito(codCredito: string): Observable<any> {
    
    // Construir la URL con el parámetro codCredito
    const url = `${this.infoCreditoApi}?id=${codCredito}`;
   
    return this.http.get<any>(url);
  }
}
