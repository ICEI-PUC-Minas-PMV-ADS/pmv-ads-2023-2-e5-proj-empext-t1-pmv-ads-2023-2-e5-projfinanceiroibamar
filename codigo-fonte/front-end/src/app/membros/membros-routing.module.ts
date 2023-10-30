import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { GerenciarMembrosComponent } from './gerenciar-membros/gerenciar-membros.component';
import { ListarMembrosComponent } from './listar-membros/listar-membros.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {path: 'membros', component: LayoutComponent, children: [
    {path: 'novo', component: GerenciarMembrosComponent, canActivate: [authGuard]},
    {path: 'editar/:id', component: GerenciarMembrosComponent, canActivate: [authGuard]},
    {path: 'listar', component: ListarMembrosComponent, canActivate: [authGuard]},
    {path: '',redirectTo: '/membros/listar', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembrosRoutingModule { }
