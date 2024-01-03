import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlujoDatosService {
  private usuarioLogin: Usuario = {
    codCliente: 0,
    usuario: "",
    contrasena: "",
    mfa: "",
    fechaCreacion: "",
    fechaUltimaModificacion: "",
    version: 0
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
  public setUsuarioLogin(usuario: Usuario) {
    this.usuarioLogin = usuario;
  }
  public getUsuarioLogin(): Usuario {
    return this.usuarioLogin;
  }


}

export interface Usuario {
  codCliente: number,
  usuario: string,
  contrasena: string,
  mfa: string,
  fechaCreacion: string,
  fechaUltimaModificacion: string,
  version: number
}