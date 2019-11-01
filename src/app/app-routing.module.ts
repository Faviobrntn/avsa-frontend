import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { CuentasComponent } from './componentes/cuentas/cuentas.component';
import { CuentasFormComponent } from './componentes/cuentas-form/cuentas-form.component';
import { RegistrosComponent } from './componentes/registros/registros.component';
import { RegistrosFormComponent } from './componentes/registros-form/registros-form.component';
import { AuthGuard } from './guardias/auth.guard';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

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
    component: CuentasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nueva-cuenta',
    component: CuentasFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editar-cuenta/:id',
    component: CuentasFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mis-registros',
    component: RegistrosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nuevo-registro',
    component: RegistrosFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editar-registro/:id',
    component: RegistrosFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mi-perfil',
    component: UsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '*',
    redirectTo: '/login'
    // component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'login'
    // component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
