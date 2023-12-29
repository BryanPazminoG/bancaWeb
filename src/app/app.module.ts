import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ErrorComponent } from './Paginas/error/error.component';
import { ProductosComponent } from './Paginas/bancaWeb/productos/productos.component';
import { TransferenciasComponent } from './Paginas/bancaWeb/transferencias/transferencias.component';
import { SidebarbwComponent } from './Bloques/bancaWeb/sidebarbw/sidebarbw.component';
import { NavbarbwComponent } from './Bloques/bancaWeb/navbarbw/navbarbw.component';
import { ConfirmacionTransferenciaComponent } from './Paginas/bancaWeb/confirmacion-transferencia/confirmacion-transferencia.component';
import { TraExitosaComponent } from './Paginas/bancaWeb/tra-exitosa/tra-exitosa.component';
import { PerfilComponent } from './Paginas/bancaWeb/perfil/perfil.component';
import { PasswordComponent } from './Paginas/bancaWeb/password/password.component';
import { SolicitudesComponent } from './Paginas/bancaWeb/solicitudes/solicitudes.component';
import { TarjetaComponent } from './Paginas/bancaWeb/tarjeta/tarjeta.component';
import { TarjetaGenComponent } from './Paginas/bancaWeb/tarjeta-gen/tarjeta-gen.component';
import { MovimientosComponent } from './Paginas/bancaWeb/movimientos/movimientos.component';
import { InfoCuentaComponent } from './Paginas/bancaWeb/info-cuenta/info-cuenta.component';
import { InfoCreditoComponent } from './Paginas/bancaWeb/info-credito/info-credito.component';
import { AmortizacionComponent } from './Paginas/bancaWeb/amortizacion/amortizacion.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    ProductosComponent,
    TransferenciasComponent,
    SidebarbwComponent,
    NavbarbwComponent,
    ConfirmacionTransferenciaComponent,
    TraExitosaComponent,
    PerfilComponent,
    PasswordComponent,
    SolicitudesComponent,
    TarjetaComponent,
    TarjetaGenComponent,
    MovimientosComponent,
    InfoCuentaComponent,
    InfoCreditoComponent,
    AmortizacionComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
