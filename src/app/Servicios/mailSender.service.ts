import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailSenderService {
  private enviarMailVerificacionApi = 'http://localhost:8080/enviarCorreo';

  constructor(private http: HttpClient) {}

  enviarMailVerificacion(
    destino: string,
    codigo: string,
    nombre: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('destino', destino)
      .set('codigo', codigo)
      .set('nombre', nombre);

    return this.http.post<any>(this.enviarMailVerificacionApi, null, {
      params: params,
    });
  }
}
