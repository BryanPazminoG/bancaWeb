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

  /*************** SETTER AND GETTER CODIGO ******************/

  private codigoVerificacion: string = "";

  setCodigo(value: string) {
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


  /*************** SETTER AND GETTER DE Nuevo Usuario ******************/

  private isNew: boolean = true;
  setIsNew(value: boolean) {
    this.isNew = value;
  }

  getIsNew(): boolean {
    return this.isNew;
  }

  private id: any = "";
  setId(value: any) {
    this.id = value;
  }
  getId(): any {
    return this.id;
  }
  /* ************* VARIABLES COMPARTIDOS DE CREDITO ***********************/
  private participePrincipal = {};
  private participeSecundario = [{}]
  private credito = {}

  /************** SETTER AND GETTER DE CREDITOS ************* */
  public setParticipePrincipal(participePrincipal: any) {
    this.participePrincipal = participePrincipal;
  }
  public getParticipePrincipal(): object {
    return this.participePrincipal;
  }
  public setParticipeSecundario(participeSecundario: any) {
    this.participeSecundario = participeSecundario;
  }
  public getParticipeSecundario(): object {
    return this.participeSecundario;
  }
  public setCredito(credito: any) {
    this.credito = credito;
  }
  public getCredito(): object {
    return this.credito;
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