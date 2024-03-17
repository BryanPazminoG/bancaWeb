import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private apiKey = 'da94a3ed7cc54b47882d3bf39a236c69';
  private headers = new HttpHeaders().set('Ocp-Apim-Subscription-Key', this.apiKey);
  
  private getCuentaByClienteApi: string = "https://cuentas-atnhilz3dq-uc.a.run.app/cuenta/obtenerCuentasCliente/";
  private getCuentaByNumeroApi: string = "https://banquitoapi.azure-api.net/api/v1/cuentas/?numero=";
  
  private getTipoCuentaAllApi: string = "https://banquitoapi.azure-api.net/api/v1/tiposcuentas"
  private getTipoCuentaByIdApi: string = "https://banquitoapi.azure-api.net/api/v1/tiposcuentas/"
  private postCuentaApi: string = "https://banquitoapi.azure-api.net/api/v1/cuentas"
  private postCuentaParticipantesApi: string = "https://banquitoapi.azure-api.net/api/v1/cuentaintervinientes"
  private getInterByClienteApi: string = "https://banquitoapi.azure-api.net/api/v1/cuentaintervinientes/clientes/"
  private getCuentaByIdApi: string = "https://banquitoapi.azure-api.net/api/v1/cuentas/";
  private getInterByCuentadApi: string = "https://banquitoapi.azure-api.net/api/v1/cuentaintervinientes/cuentas/"
  private postTransaccionApi: string = "https://banquitoapi.azure-api.net/api/v1/transacciones/depositos"

  constructor(private http: HttpClient) { }

  getCuentaByClienteAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getCuentaByClienteApi + id, { headers: this.headers });
  }
  postCuentaAPI(registroCuenta: any): Observable<any> {
    return this.http.post<any>(this.postCuentaApi, registroCuenta, { headers: this.headers });
  }
  postCuentaParticipantesAPI(registroCuentaParticipantes: any): Observable<any> {
    return this.http.post<any>(this.postCuentaParticipantesApi, registroCuentaParticipantes, { headers: this.headers });
  }
  getCuentaByIdAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getCuentaByIdApi + id, { headers: this.headers });
  }
  getCuentaByNumeroAPI(numeroCuenta: string): Observable<any> {
    return this.http.get<any>(this.getCuentaByNumeroApi + numeroCuenta, { headers: this.headers });
  }
  getTipoCuentaAllAPI(): Observable<any> {
    return this.http.get<any>(this.getTipoCuentaAllApi, { headers: this.headers }); //as
  }
  getTipoCuentaByIdAPI(id: string): Observable<any> {
    return this.http.get<any>(this.getTipoCuentaByIdApi + id, { headers: this.headers });
  }
  getInterByCuentadAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getInterByCuentadApi + id, { headers: this.headers });
  }
  getInterByClienteAPI(id: any): Observable<any> {
    return this.http.get<any>(this.getInterByClienteApi + id, { headers: this.headers });
  }
  postTransaccionAPI(registroTransaccion: any): Observable<any> {
    return this.http.post<any>(this.postTransaccionApi, registroTransaccion, { headers: this.headers });
  }
}
