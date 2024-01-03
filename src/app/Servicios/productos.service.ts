import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private cuentasAhorroApi = "http://34.125.120.215:8080/cuenta/obtenerCuentasCliente/1";
  private creditosApi = "http://34.125.114.60:8080/credito/buscar-codigo-cliente?codCliente=7";

  constructor(private http: HttpClient) { }

  obtenerCuentasAhorro(): Observable<any> {
    return this.http.get<any>(this.cuentasAhorroApi);
  }

  obtenerCreditos(): Observable<any> {
    return this.http.get<any>(this.creditosApi);
  }

}
