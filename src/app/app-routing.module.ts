import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Paginas/error/error.component';
import { ProductosComponent } from './Paginas/bancaWeb/productos/productos.component';
import { TransferenciasComponent } from './Paginas/bancaWeb/transferencias/transferencias.component';
import { ConfirmacionTransferenciaComponent } from './Paginas/bancaWeb/confirmacion-transferencia/confirmacion-transferencia.component';
import { TraExitosaComponent } from './Paginas/bancaWeb/tra-exitosa/tra-exitosa.component';
import { PerfilComponent } from './Paginas/bancaWeb/perfil/perfil.component';
import { PasswordComponent } from './Paginas/bancaWeb/password/password.component';



const routes: Routes = [
  //{ path:'' , component: HomeComponent, pathMatch: 'full' },
  { path:'productos' , component : ProductosComponent},
  { path:'transferencias' , component : TransferenciasComponent},
  { path:'confirmacion-transferencia' , component : ConfirmacionTransferenciaComponent},
  { path:'tra-exitosa' , component : TraExitosaComponent},
  { path:'perfil' , component : PerfilComponent},
  { path:'password' , component : PasswordComponent},
  { path:'**' , component : ErrorComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
