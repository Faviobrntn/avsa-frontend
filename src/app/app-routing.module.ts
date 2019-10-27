import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { CuentasComponent } from './componentes/cuentas/cuentas.component';
import { CuentasFormComponent } from './componentes/cuentas-form/cuentas-form.component';
import { RegistrosComponent } from './componentes/registros/registros.component';
import { RegistrosFormComponent } from './componentes/registros-form/registros-form.component';

const routes: Routes = [
  {
    path: 'login/google/callback/:token/:expires',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'mis-cuentas',
    component: CuentasComponent
  },
  {
    path: 'nueva-cuenta',
    component: CuentasFormComponent
  },
  {
    path: 'editar-cuenta/:id',
    component: CuentasFormComponent
  },
  {
    path: 'mis-registros',
    component: RegistrosComponent
  },
  {
    path: 'nuevo-registro',
    component: RegistrosFormComponent
  },
  {
    path: 'editar-registro/:id',
    component: RegistrosFormComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '*',
    redirectTo: 'home'
    // component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
