import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  private apiKey = 'da94a3ed7cc54b47882d3bf39a236c69';
  private headers = new HttpHeaders().set('Ocp-Apim-Subscription-Key', this.apiKey);

  private transferenciasApi = "https://banquitoapi.azure-api.net/api/v1/transacciones/transferencias"; 

  constructor(private http: HttpClient) { }

  realizarTransferencia(datosTransferencia: any, monto: number): Observable<any> {
  
    return this.http.post<any>(`${this.transferenciasApi}?monto=${monto}`, datosTransferencia, { headers: this.headers });
  }
}
