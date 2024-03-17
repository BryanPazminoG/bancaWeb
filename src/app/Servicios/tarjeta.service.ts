import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private apiKey = 'da94a3ed7cc54b47882d3bf39a236c69';
  private headers = new HttpHeaders().set('Ocp-Apim-Subscription-Key', this.apiKey);

  private tarjetaApi = "https://banquitoapi.azure-api.net/api/v1/tarjetas"; 

  constructor(private http: HttpClient) { }

  generarTarjeta(tarjeta: any): Observable<any> {
    //const params = { tarjeta };
    console.log("el cuerpo de envio es: ",tarjeta);
    console.log("El resultado es: ",this.http.post<any>(`${this.tarjetaApi}`, tarjeta));
    return this.http.post<any>(`${this.tarjetaApi}`, tarjeta, { headers: this.headers });
  }
}
