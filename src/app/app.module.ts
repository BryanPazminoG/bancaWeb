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
import { VerifyIdentityComponent } from './Paginas/session/verify-identity/verify-identity.component';
import { LoginComponent } from './Paginas/session/login/login.component';
import { MailConfirmationComponent } from './Paginas/session/mail-confirmation/mail-confirmation.component';
import { RegisterComponent } from './Paginas/session/register/register.component';
import { CurrencyPipe } from '@angular/common';



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
    VerifyIdentityComponent,
    LoginComponent,
    MailConfirmationComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    TransferenciasComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
