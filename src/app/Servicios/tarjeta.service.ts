import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private tarjetaApi = "http://localhost:8080/tarjetas/tarjetas"; 

  constructor(private http: HttpClient) { }

  generarTarjeta(cuentaId: string): Observable<any> {
    const params = { cuentaId };
    return this.http.post<any>(`${this.tarjetaApi}/generar`, params);
  }
}
