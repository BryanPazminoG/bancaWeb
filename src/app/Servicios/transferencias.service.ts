import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  private transferenciasApi = "URL_DE_TU_API_PARA_TRANSFERENCIAS"; 

  constructor(private http: HttpClient) { }

  realizarTransferencia(datosTransferencia: any): Observable<any> {
  
    return this.http.post<any>(this.transferenciasApi, datosTransferencia);
  }
}
