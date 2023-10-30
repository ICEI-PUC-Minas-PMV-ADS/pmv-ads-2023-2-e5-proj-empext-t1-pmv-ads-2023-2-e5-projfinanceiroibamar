import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { authGuard } from '../auth.guard';
import { GerenciarCategoriasComponent } from './gerenciar-categorias/gerenciar-categorias.component';

const routes: Routes = [
  {path: 'categorias', component: LayoutComponent, children: [
    {path: 'novo', component: GerenciarCategoriasComponent, canActivate: [authGuard]},
    {path: 'editar/:id', component: GerenciarCategoriasComponent, canActivate: [authGuard]},
    {path: 'listar', component: ListarCategoriasComponent, canActivate: [authGuard]},
    {path: '',redirectTo: '/categorias/listar', pathMatch: 'full'}
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
