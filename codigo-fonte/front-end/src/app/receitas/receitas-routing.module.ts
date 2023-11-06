import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { GerenciarReceitasComponent } from './gerenciar-receitas/gerenciar-receitas.component';
import { ListarReceitasComponent } from './listar-receitas/listar-receitas.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'receitas', component: LayoutComponent, children: [
    { path: 'novo', component: GerenciarReceitasComponent, canActivate: [authGuard] },
    { path: 'editar/:id', component: GerenciarReceitasComponent, canActivate: [authGuard] },
    { path: 'listar', component: ListarReceitasComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/receitas/listar', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceitasRoutingModule { }

