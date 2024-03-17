import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  
  private getCuentaByClienteApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/cuenta/obtenerCuentasCliente/";
  private getCuentaByNumeroApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/cuentas/?numero=";
  private postCuentaSaveApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/cuenta/save";
  
  private getTipoCuentaAllApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/tiposcuentas"
  private getTipoCuentaByIdApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/tiposcuentas/"
  private postCuentaApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/cuentas"
  private postCuentaParticipantesApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/cuentaintervinientes"
  private getInterByClienteApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/cuentaintervinientes/clientes/"
  private getCuentaByIdApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/cuentas/";
  private getInterByCuentadApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/cuentaintervinientes/cuentas/"
  private postTransaccionApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/api/v1/transacciones/depositos"

  constructor(private http: HttpClient) { }

  getCuentaByClienteAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getCuentaByClienteApi + id);
  }
  postCuentaAPI(registroCuenta: any): Observable<any> {
    return this.http.post<any>(this.postCuentaApi, registroCuenta);
  }
  postCuentaParticipantesAPI(registroCuentaParticipantes: any): Observable<any> {
    return this.http.post<any>(this.postCuentaParticipantesApi, registroCuentaParticipantes);
  }
  getCuentaByIdAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getCuentaByIdApi + id);
  }
  getCuentaByNumeroAPI(numeroCuenta: string): Observable<any> {
    return this.http.get<any>(this.getCuentaByNumeroApi + numeroCuenta);
  }
  getTipoCuentaAllAPI(): Observable<any> {
    return this.http.get<any>(this.getTipoCuentaAllApi); //as
  }
  getTipoCuentaByIdAPI(id: string): Observable<any> {
    return this.http.get<any>(this.getTipoCuentaByIdApi + id);
  }
  getInterByCuentadAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getInterByCuentadApi + id);
  }
  getInterByClienteAPI(id: any): Observable<any> {
    return this.http.get<any>(this.getInterByClienteApi + id);
  }
  postTransaccionAPI(registroTransaccion: any): Observable<any> {
    return this.http.post<any>(this.postTransaccionApi, registroTransaccion);
  }
}
