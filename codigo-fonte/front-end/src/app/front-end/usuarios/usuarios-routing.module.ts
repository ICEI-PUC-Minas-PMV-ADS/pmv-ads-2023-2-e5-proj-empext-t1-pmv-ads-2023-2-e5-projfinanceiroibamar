import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { authGuard } from '../auth.guard';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  {path: 'usuarios', component: LayoutComponent, children: [
    {path: 'novo', component: GerenciarUsuariosComponent, canActivate: [authGuard]},
    {path: 'editar/:id', component: GerenciarUsuariosComponent, canActivate: [authGuard]},
    {path: 'listar', component: ListarUsuariosComponent, canActivate: [authGuard]},
    {path: '',redirectTo: '/usuarios/listar', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
