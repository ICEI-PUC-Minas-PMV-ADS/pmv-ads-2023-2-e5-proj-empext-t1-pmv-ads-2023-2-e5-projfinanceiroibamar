import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { GerenciarFornecedoresComponent } from './gerenciar-fornecedores/gerenciar-fornecedores.component';
import { authGuard } from '../auth.guard';
import { ListarFornecedoresComponent } from './listar-fornecedores/listar-fornecedores.component';

const routes: Routes = [
  {path: 'fornecedores', component: LayoutComponent, children: [
    {path: 'novo', component: GerenciarFornecedoresComponent, canActivate: [authGuard]},
    {path: 'editar/:id', component: GerenciarFornecedoresComponent, canActivate: [authGuard]},
    {path: 'listar', component: ListarFornecedoresComponent, canActivate: [authGuard]},
    {path: '',redirectTo: '/fornecedores/listar', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
