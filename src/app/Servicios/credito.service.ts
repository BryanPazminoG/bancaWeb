import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlujoDatosService } from './flujo-datos.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private getAllTipoCreApi: string = "http://34.72.172.227:8080/api/v1/tipoCreditos";
  private getByIdTipoCreApi: string = "http://34.72.172.227:8080/api/v1/tipoCreditos/";
  private getByIdTasaIntApi: string = "http://34.72.172.227:8080/api/v1/tasaInteres/";
  private getCalculoTasaIntApi: string = "http://34.72.172.227:8080/api/v1/tasaInteres/";
  private getPreTablaPagoApi: string = "http://34.72.172.227:8080/api/v1/tablaAmortizacion/";
  private postCreditoApi: string = "http://34.72.172.227:8080/api/v1/creditos";
  private postCredIntApi: string = "http://34.72.172.227:8080/api/v1/intervinientes";
  private postTablaPagApi: string = "http://34.72.172.227:8080/api/v1/tablaAmortizacion";
  private getCreditoByIdent: string = "http://34.72.172.227:8080/api/v1/creditos/clientes/";
  private getCreditoById: string = "http://34.72.172.227:8080/api/v1/creditos/";
  private getPoximoPago: string = "http://34.72.172.227:8080/api/v1/tablaAmortizacion/estados?codCredito=";
  private getTablaAmortizacion: string = "http://34.72.172.227:8080/api/v1/tablaAmortizacion/";

  constructor(private http: HttpClient, private flujoDatosService: FlujoDatosService) { }

  getAllTipoCreAPI(): Observable<any> {
    return this.http.get<any>(this.getAllTipoCreApi);
  }
  getATablaAmortizacionAPI(idCredito: number): Observable<any> {
    return this.http.get<any>(this.getTablaAmortizacion + idCredito);
  }
  getCreditoByIdentAPI(identificacion: String): Observable<any> {
    return this.http.get<any>(this.getCreditoByIdent + identificacion);
  }
  getCreditoByIdAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getCreditoById + id);
  }
  getProximoPago(id: number): Observable<any> {
    return this.http.get<any>(this.getPoximoPago + id + "&estado=PRX");
  }
  getByIdTipoCreAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getByIdTipoCreApi + id);
  }
  getByIdTasaIntAPI(id: string): Observable<any> {
    return this.http.get<any>(this.getByIdTasaIntApi + id);
  }
  getCalculoTasaIntAPI(id: string, monto: number, plazo: number): Observable<any> {
    console.log(this.getCalculoTasaIntApi + id + "/" + monto + "/" + plazo);
    return this.http.get<any>(this.getCalculoTasaIntApi + id + "/" + monto + "/" + plazo);
  }
  getPreTablaPagoAPI(tasaInteres: number, montoPrestamo: number, numeroPagos: number): Observable<any> {
    return this.http.get<any>(this.getPreTablaPagoApi + tasaInteres + "/" + montoPrestamo + "/" + numeroPagos);
  }
  postCreditoAPI(registroCredito: any): Observable<any> {
    return this.http.post<any>(this.postCreditoApi, registroCredito);
  }
  postCredIntAPI(creditoIntRegistro: any): Observable<any> {
    return this.http.post<any>(this.postCredIntApi, creditoIntRegistro);
  }
  postTablaPagAPI(tablaPagosRegistro: any): Observable<any> {
    return this.http.post<any>(this.postTablaPagApi, tablaPagosRegistro);
  }
}
