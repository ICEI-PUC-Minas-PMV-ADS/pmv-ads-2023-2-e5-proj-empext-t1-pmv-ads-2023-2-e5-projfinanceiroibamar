import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { GerenciarDespesasComponent } from './gerenciar-despesas/gerenciar-despesas.component'; // Alterado de 'GerenciarReceitasComponent' para 'GerenciarDespesasComponent'
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component'; // Alterado de 'ListarReceitasComponent' para 'ListarDespesasComponent'
import { authGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'despesas', component: LayoutComponent, children: [ // Alterado de 'receitas' para 'despesas'
    { path: 'novo', component: GerenciarDespesasComponent, canActivate: [authGuard] }, // Alterado de 'GerenciarReceitasComponent' para 'GerenciarDespesasComponent'
    { path: 'editar/:id', component: GerenciarDespesasComponent, canActivate: [authGuard] }, // Alterado de 'GerenciarReceitasComponent' para 'GerenciarDespesasComponent'
    { path: 'listar', component: ListarDespesasComponent, canActivate: [authGuard] }, // Alterado de 'ListarReceitasComponent' para 'ListarDespesasComponent'
    { path: '', redirectTo: '/despesas/listar', pathMatch: 'full' } // Alterado de '/receitas/listar' para '/despesas/listar'
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesasRoutingModule { } // Alterado de 'ReceitasRoutingModule' para 'DespesasRoutingModule'

