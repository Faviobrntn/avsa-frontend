import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HomeComponent } from './componentes/home/home.component';
import { TablaComponent } from './componentes/tabla/tabla.component';
import { FormComponent } from './componentes/form/form.component';
import { CuentasComponent } from './componentes/cuentas/cuentas.component';
import { CuentasFormComponent } from './componentes/cuentas-form/cuentas-form.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent
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
    path: 'tabla',
    component: TablaComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: '*',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
