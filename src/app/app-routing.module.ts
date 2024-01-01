import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Paginas/error/error.component';
import { ProductosComponent } from './Paginas/bancaWeb/productos/productos.component';
import { TransferenciasComponent } from './Paginas/bancaWeb/transferencias/transferencias.component';
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
import { LoginComponent } from './Paginas/session/login/login.component';
import { VerifyIdentityComponent } from './Paginas/session/verify-identity/verify-identity.component';
import { MailConfirmationComponent } from './Paginas/session/mail-confirmation/mail-confirmation.component';
import { RegisterComponent } from './Paginas/session/register/register.component';


const routes: Routes = [
  //{ path:'' , component: HomeComponent, pathMatch: 'full' },
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent  },
  { path: 'verify-identity', component: VerifyIdentityComponent  },
  { path: 'mail-verification', component: MailConfirmationComponent  },
  { path: 'register', component: RegisterComponent },
  { path:'productos' , component : ProductosComponent},
  { path:'transferencias' , component : TransferenciasComponent},
  { path:'confirmacion-transferencia' , component : ConfirmacionTransferenciaComponent},
  { path:'tra-exitosa' , component : TraExitosaComponent},
  { path:'perfil' , component : PerfilComponent},
  { path:'password' , component : PasswordComponent},
  { path:'solicitudes' , component : SolicitudesComponent},
  { path:'tarjeta' , component : TarjetaComponent},
  { path:'tarjeta-gen' , component : TarjetaGenComponent},
  { path:'movimientos/:id' , component : MovimientosComponent},
  { path:'info-cuenta/:id' , component : InfoCuentaComponent},
  { path:'info-credito/:id' , component : InfoCreditoComponent},
  { path:'amortizacion' , component : AmortizacionComponent},
  { path:'**' , component : ErrorComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
