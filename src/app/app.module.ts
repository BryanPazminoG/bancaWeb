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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
