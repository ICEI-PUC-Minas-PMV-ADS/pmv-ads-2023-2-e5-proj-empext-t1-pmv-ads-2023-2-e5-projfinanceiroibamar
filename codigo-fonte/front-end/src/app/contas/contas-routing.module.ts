import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { DetalharContasComponent } from './detalhar-contas/detalhar-contas.component';
import { ListarContasComponent } from './listar-contas/listar-contas.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {path: 'contas', component: LayoutComponent, children: [
    {path: 'novo', component: DetalharContasComponent, canActivate: [authGuard]},
    {path: 'editar/:id', component: DetalharContasComponent, canActivate: [authGuard]},
    {path: 'listar', component: ListarContasComponent, canActivate: [authGuard]},
    {path: '',redirectTo: '/contas/listar', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasRoutingModule { }
