import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  private transferenciasApi = "http://35.192.152.130:8089/api/v1/transacciones/transferencias"; 

  constructor(private http: HttpClient) { }

  realizarTransferencia(datosTransferencia: any): Observable<any> {
  
    return this.http.put<any>(this.transferenciasApi, datosTransferencia);
  }
}
