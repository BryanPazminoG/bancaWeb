import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private tarjetaApi = "http://35.232.62.178:8080/api/v1/tarjetas"; 

  constructor(private http: HttpClient) { }

  generarTarjeta(tarjeta: any): Observable<any> {
    //const params = { tarjeta };
    console.log("el cuerpo de envio es: ",tarjeta);
    console.log("El resultado es: ",this.http.post<any>(`${this.tarjetaApi}`, tarjeta));
    return this.http.post<any>(`${this.tarjetaApi}`, tarjeta);
  }
}
