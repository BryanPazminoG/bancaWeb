import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { CuentaService } from 'src/app/Servicios/cuenta.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit{

  participantes = {
    'cod_cliente': '',
    'numeroCuenta': '',
    'tipo_identificacion': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
    'razonSocial': '',
  }
  participePrincipal = {
    'cod_cliente': '',
    'codCuenta': 0,
    'numeroCuenta': '',
    'tipo_identificacion': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
    'razonSocial': '',
    'direccion': '',
    'telefono': '',
    'correo_electronico': '',
  };
  participeSecundario = [{}];
  cuentasClienteP = [{
    'codCuenta': 0,
    'codCliente': '0',
    'numeroCuenta': '',
  }];
  cuentasClienteS = [{
    'codCuenta': 0,
    'codCliente': '0',
    'numeroCuenta': '',
  }];
  listaIntervinientes = [{
    "estado": "",
    "pk": {
      "codCuenta": 0,
      "codClientePersona": 0,
    }
  }];
  cuentasParticipes = [{}];

  identPFirst = true;
  identPValidacion = false;
  identSFirst = true;
  identSValidacion = false;
  existencia = false;

  mensajeIdentificacion: string = "Identificacion Incorrecta";
  mensajeIdentificacionDos: string = "Identificacion Incorrecta";
  mensajeValidacion: string = "El cliente y existe";

  constructor(
    private router: Router,
    private serviceCliente: ClienteService,
    private serviceCuenta: CuentaService,
    private flujoDatosService: FlujoDatosService
  ) { }

  ngOnInit(): void {

    const usuarioLoggeado = localStorage.getItem('usuario');
    
    if (usuarioLoggeado) {
      const usuario = JSON.parse(usuarioLoggeado);
      const codCliente = usuario.codCliente;
      this.getClienteP(codCliente);
      this.listaIntervinientes.pop();
      this.cuentasClienteP.pop();
      this.cuentasClienteS.pop();
    }
  }

  getClienteP(codCliente:any) {
    this.participePrincipal.cod_cliente = '';
    this.participePrincipal.apellidos = '';
    this.participePrincipal.nombres = '';
    this.participePrincipal.razonSocial = '';
    this.participePrincipal.direccion = '';
    this.participePrincipal.telefono = '';
    this.participePrincipal.correo_electronico = '';

    this.listaIntervinientes = [{
      "estado": "",
      "pk": {
        "codCuenta": 0,
        "codClientePersona": 0,
      }
    }];

    this.listaIntervinientes.pop();

    this.cuentasClienteP = [{
      'codCuenta': 0,
      'codCliente': '0',
      'numeroCuenta': '',
    }];

    this.cuentasClienteP.pop();
    
    this.restValorClienteP();

    this.serviceCliente.buscarClientePorId(codCliente).subscribe(
      (data) => {
        this.identPFirst = false;
        this.identPValidacion = true;
        if (data) {
          this.participePrincipal = {
            'cod_cliente': data.idCliente,
            'codCuenta': 0,
            'numeroCuenta': '',
            'tipo_identificacion': data.tipoIdentificacion,
            'numero_identificacion': data.numeroIdentificacion,
            'apellidos': data.apellidos,
            'nombres': data.nombres,
            'razonSocial': data.razonSocial,
            'direccion': data.direcciones[0].linea1,
            'telefono': data.telefonos[0].numero,
            'correo_electronico': data.correoElectronico,
          }
          this.getCuentaByClienteAPI("PRI");
        } else {
          this.mensajeIdentificacion = "Identificacion Incorrecta";
          this.identPValidacion = false;
        }
      },
      (error) => {
        this.identPValidacion = false;
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  getClienteS() {
    this.participantes['cod_cliente'] = '';
    this.participantes['apellidos'] = '';
    this.participantes['nombres'] = '';
    this.participantes['razonSocial'] = '';

    this.restValorClienteS();

    this.serviceCliente.buscarClientePorParametros(this.participantes['tipo_identificacion'], this.participantes['numero_identificacion']).subscribe(
      (data) => {
        this.identSFirst = false;
        this.identSValidacion = true;
        if (data) {
          this.participantes['cod_cliente'] = data.idCliente;
          this.participantes['tipo_identificacion'] = data.tipoIdentificacion;
          this.participantes['numero_identificacion'] = data.numeroIdentificacion;
          this.participantes['apellidos'] = data.apellidos;
          this.participantes['nombres'] = data.nombres;
          this.participantes['razonSocial'] = data.razonSocial;
          this.getCuentaByClienteAPI("SEC");
        } else {
          this.mensajeIdentificacionDos = "Identificacion Incorrecta";
          this.identSValidacion = false;
        }
      },
      (error) => {
        this.identSValidacion = false;
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  addParticipante() {

    if ((this.participantes['nombres'] != "" && this.participantes['apellidos'] != "") || (this.participantes['razonSocial'] != "")) {
      let objetoEncontrado = this.participeSecundario.find(objeto => {
        return JSON.stringify(objeto) === JSON.stringify(this.participantes);
      });
      let numCuenta = this.participantes.numeroCuenta;
      if (!objetoEncontrado && this.participePrincipal.numero_identificacion !== this.participantes.numero_identificacion && numCuenta != "") {
        this.existencia = false;
        this.participeSecundario.push({ ...this.participantes });

        let tableBody = document.getElementById('tbParticipante') as HTMLTableElement;
        let row = document.createElement('tr');

        let cell = document.createElement('td');
        let textP = document.createElement('p');
        let cell1 = document.createElement('td');
        let textP1 = document.createElement('p');
        let cell2 = document.createElement('td');
        let textP2 = document.createElement('p');
        let cell3 = document.createElement('td');
        let textP3 = document.createElement('p');
        let cell4 = document.createElement('td');
        let textP4 = document.createElement('p');
        let cell5 = document.createElement('td');
        let numberOfRows = tableBody.rows.length;
        textP.innerHTML = numberOfRows.toString();
        cell.appendChild(textP);
        row.appendChild(cell);

        textP1.innerHTML = this.participantes.tipo_identificacion;
        cell1.appendChild(textP1);
        row.appendChild(cell1);

        textP2.innerHTML = this.participantes.numero_identificacion;
        cell2.appendChild(textP2);
        row.appendChild(cell2);

        textP3.innerHTML = this.participantes.numeroCuenta;
        cell3.appendChild(textP3);
        row.appendChild(cell3);

        let texto = this.participantes.razonSocial == null ? this.participantes.apellidos + " " + this.participantes.nombres : this.participantes.razonSocial;
        textP4.innerHTML = texto;
        cell4.appendChild(textP4);
        row.appendChild(cell4);

        var boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn btn-dark w-100";

        boton.onclick = () => {
          this.EliminarFila(boton);
        };
        var icono = document.createElement("i");
        icono.className = "bi bi-x-lg";

        boton.appendChild(icono);
        cell5.appendChild(boton);
        row.appendChild(cell5);
        tableBody.appendChild(row);

        this.participantes['cod_cliente'] = '';
        this.participantes['tipo_identificacion'] = '';
        this.participantes['numero_identificacion'] = '';
        this.participantes['apellidos'] = '';
        this.participantes['nombres'] = '';
        this.participantes['razonSocial'] = '';
        this.participantes['numeroCuenta'] = '';
        this.cuentasParticipes.push({ ...this.cuentasClienteS });
        this.cuentasClienteS =
          [{
            'codCuenta': 0,
            'codCliente': '0',
            'numeroCuenta': '',
          }];

      } else {
        if (numCuenta == "") this.mensajeValidacion = "Seleccione una cuenta";
        else this.mensajeValidacion = "El cliente y existe";

        this.existencia = true;
      }
    }
  }

  EliminarFila(event: any) {
    var fila = event.closest('tr');
    if (fila) {
      var cuartaColumnaElement = fila.querySelector('td:nth-child(3)');
      if (cuartaColumnaElement !== null) {
        var cuartaColumna = cuartaColumnaElement.textContent;

        let objetoLista = this.participeSecundario.findIndex(objeto => {
          return JSON.stringify(objeto).includes(cuartaColumna);
        });
        if (objetoLista !== -1) {
          this.participeSecundario.splice(objetoLista, 1);
        }
      }

    }
    fila.remove();
  }
  getCuentaByClienteAPI(tipoParticipante: string) {

    let idCliente = '';
    if (tipoParticipante == "PRI") idCliente = this.participePrincipal.cod_cliente;
    else idCliente = this.participantes.cod_cliente;
    if (idCliente != '') {
      this.serviceCuenta.getInterByClienteAPI(idCliente).subscribe(
        (data) => {
          if (data) {
            this.listaIntervinientes = data;
            this.listaIntervinientes.forEach((interviniente) => {
              this.serviceCuenta.getCuentaByIdAPI(interviniente.pk.codCuenta).subscribe(
                (data) => {
                  if (data) {
                    if (tipoParticipante == "PRI") {
                      this.cuentasClienteP.push(data);
                      this.identPValidacion = true;
                    } else {
                      this.cuentasClienteS.push(data);
                      this.identSValidacion = true;
                    }
                  }
                },
                (error) => {
                  console.error('Error al hacer la solicitud:', error);
                  if (tipoParticipante == "PRI") {
                    this.restValorClienteP();
                    this.mensajeIdentificacion = "El cliente no tiene una cuenta en el banco"
                    this.identPValidacion = false;
                  } else if (tipoParticipante == "SEC") {
                    this.restValorClienteS();
                    this.mensajeIdentificacionDos = "El cliente no tiene una cuenta en el banco"
                    this.identSValidacion = false;
                  }
                }
              );
            });
          }
        },
        (error) => {
          console.error('Error al hacer la solicitud:', error);
        }
      );
    }
  }

  validacionesEnteros(event: any, min: number, max: number) {
    let valor = Math.round(event.target.value);
    if (valor < min) event.target.value = min;
    else if (valor > max) event.target.value = max;
    else event.target.value = valor;
  }
  restValorClienteP() {
    this.participePrincipal.cod_cliente = '';
    this.participePrincipal.codCuenta = 0;
    this.participePrincipal.numeroCuenta = "";
    //this.participePrincipal.numero_identificacion = "";
    this.participePrincipal.apellidos = "";
    this.participePrincipal.nombres = "";
    this.participePrincipal.razonSocial = "";
    this.participePrincipal.direccion = "";
    this.participePrincipal.telefono = "";
    this.participePrincipal.correo_electronico = "";
    this.cuentasClienteP = [{
      'codCuenta': 0,
      'codCliente': '0',
      'numeroCuenta': '',
    }];
    this.cuentasClienteP.pop();

    this.listaIntervinientes = [{
      "estado": "",
      "pk": {
        "codCuenta": 0,
        "codClientePersona": 0,
      }
    }];
  }
  restValorClienteS() {
    this.participantes.cod_cliente = '';
    this.participantes.numeroCuenta = "";
    //this.participantes.numero_identificacion = "";
    this.participantes.apellidos = "";
    this.participantes.nombres = "";
    this.participantes.razonSocial = "";
    this.cuentasClienteS = [{
      'codCuenta': 0,
      'codCliente': '0',
      'numeroCuenta': '',
    }];
    this.cuentasClienteS.pop();

    this.listaIntervinientes = [{
      "estado": "",
      "pk": {
        "codCuenta": 0,
        "codClientePersona": 0,
      }
    }];
    this.listaIntervinientes.pop();
  }
  continuar() {
    console.log(this.participePrincipal);
    if (this.participePrincipal.apellidos != "" && this.participePrincipal.numeroCuenta != "") {
      const cuenta = this.cuentasClienteP.find(objeto => objeto.numeroCuenta === this.participePrincipal.numeroCuenta);
      if(cuenta){
        this.participePrincipal.codCuenta = cuenta.codCuenta;
      }
      this.flujoDatosService.setParticipePrincipal(this.participePrincipal);
      this.participeSecundario.splice(0, 1);
      this.flujoDatosService.setParticipeSecundario(this.participeSecundario);

      this.router.navigate(["datosCredito"]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Completar los datos",
        text: "Todos los campos obligatorios deben ser llenados",
        showConfirmButton: false,
        timer: 2500
      });
    }
    this.listaIntervinientes.pop();
  }
  regresar() {
    this.router.navigate(["creditos"]);
  }
}
