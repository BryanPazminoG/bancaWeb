import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  private cuentasAhorroApi = "http://localhost:8080/cuenta/getbyid";
  private creditosApi = "http://localhost:8080/productos/creditos";

  constructor(private http: HttpClient) { }

  obtenerCuentasAhorro(): Observable<any> {
    return this.http.get<any>(this.cuentasAhorroApi);
  }

  obtenerCreditos(): Observable<any> {
    return this.http.get<any>(this.creditosApi);
  }

}
