import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  private transferenciasApi = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/transacciones/transferencias"; 

  constructor(private http: HttpClient) { }

  realizarTransferencia(datosTransferencia: any, monto: number): Observable<any> {
  
    return this.http.post<any>(`${this.transferenciasApi}?monto=${monto}`, datosTransferencia);
  }
}
