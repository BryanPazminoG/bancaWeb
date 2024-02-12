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
    'cod_cliente': 0,
    'numeroCuenta': '',
    'tipo_identificacion': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
    'razonSocial': '',
  };
  participePrincipal = {
    'cod_cliente': 0,
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
    'codCliente': 0,
    'numeroCuenta': '',
  }];
  cuentasClienteS = [{
    'codCuenta': 0,
    'codCliente': 0,
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
  mensajeIdentificacion: string = "Identificacion Incorrecta";
  mensajeIdentificacionDos: string = "Identificacion Incorrecta";
  mensajeValidacion: string = "El cliente ya existe";

  identPFirst = true;
  identPValidacion = false;
  identSFirst = true;
  identSValidacion = false;
  existencia = false;

  constructor(
    private router: Router,
    private serviceCliente: ClienteService,
    private serviceCuenta: CuentaService, //TODAVIA NO EXISTE
    private flujoDatosService: FlujoDatosService
  ) { }

  ngOnInit(): void {
    this.listaIntervinientes.pop();
    this.cuentasClienteP.pop();
    this.cuentasClienteS.pop();

    // var usuarioWeb = this.flujoDatosService.getDatos();
    // this.participePrincipal.codCliente = usuarioWeb.codCliente;
    // this.participePrincipal.nombres = usuarioWeb.nombres;
    // this.participePrincipal.apellidos = usuarioWeb.apellidos;
  }

  getClienteP() {
    this.participePrincipal.cod_cliente = 0;
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
      'codCliente': 0,
      'numeroCuenta': '',
    }];

    this.cuentasClienteP.pop();
    
    this.restValorClienteP();

    this.serviceCliente.buscarClientePorParametros(this.participePrincipal.tipo_identificacion, this.participePrincipal.numero_identificacion).subscribe(
      (data) => {
        this.identPFirst = false;
        this.identPValidacion = true;
        if (data) {
          this.participePrincipal = {
            'cod_cliente': data.codigo,
            'codCuenta': 0,
            'numeroCuenta': '',
            'tipo_identificacion': data.tipoIdentificacion,
            'numero_identificacion': data.numeroIdentificacion,
            'apellidos': data.apellidos,
            'nombres': data.nombres,
            'razonSocial': data.razonSocial,
            'direccion': data.direccion,
            'telefono': data.telefono,
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
    this.participantes['cod_cliente'] = 0;
    this.participantes['apellidos'] = '';
    this.participantes['nombres'] = '';
    this.participantes['razonSocial'] = '';

    this.restValorClienteS();

    this.serviceCliente.buscarClientePorParametros(this.participantes['tipo_identificacion'], this.participantes['numero_identificacion']).subscribe(
      (data) => {
        this.identSFirst = false;
        this.identSValidacion = true;
        if (data) {
          this.participantes['cod_cliente'] = data.codigo;
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

        this.participantes['cod_cliente'] = 0;
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
            'codCliente': 0,
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
    let idCliente = 0;
    if (tipoParticipante == "PRI") idCliente = this.participePrincipal.cod_cliente;
    else idCliente = this.participantes.cod_cliente;
    if (idCliente != 0) {
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
  restValorClienteP() {
    this.participePrincipal.cod_cliente = 0;
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
      'codCliente': 0,
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
    this.participantes.cod_cliente = 0;
    this.participantes.numeroCuenta = "";
    //this.participantes.numero_identificacion = "";
    this.participantes.apellidos = "";
    this.participantes.nombres = "";
    this.participantes.razonSocial = "";
    this.cuentasClienteS = [{
      'codCuenta': 0,
      'codCliente': 0,
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
      this.router.navigate(["/datosCredito"]);
    }

  regresar() {
    this.router.navigate(["creditos"]);
  }
}
