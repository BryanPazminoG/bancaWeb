import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlujoDatosService {
  private usuarioLogin: Object = {
    nombre: "",
    usuario: ""
  }

  private datosCompartidos: any;

  constructor() { }

  setDatos(datos: any) {
    this.datosCompartidos = datos;
  }

  getDatos() {
    return this.datosCompartidos;
  }

/*************** SETTER AND GETTER DE LOGIN ******************/

  private codigoVerificacion: string = "";

  setCodigo(value: string){
    this.codigoVerificacion = value;
  }

  getCodigo() {
    return this.codigoVerificacion;
  }

/*************** SETTER AND GETTER DE LOGIN ******************/
  public setUsuarioLogin(usuario: object) {
    this.usuarioLogin = usuario;
  }
  public getUsuarioLogin(): object {
    return this.usuarioLogin;
  }

}
