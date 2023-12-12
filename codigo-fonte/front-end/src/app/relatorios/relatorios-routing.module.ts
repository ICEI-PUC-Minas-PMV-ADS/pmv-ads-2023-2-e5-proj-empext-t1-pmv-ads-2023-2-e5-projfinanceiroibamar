import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { RelReceitasComponent } from './rel-receitas/rel-receitas.component';
import { RelDespesasComponent } from './rel-despesas/rel-despesas.component';
import { RelMensalComponent } from './rel-mensal/rel-mensal.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'relatorios', component: LayoutComponent, children: [
    { path: 'receitas', component: RelReceitasComponent, canActivate: [authGuard] },
    { path: 'despesas', component: RelDespesasComponent, canActivate: [authGuard] },
    { path: 'mensal', component: RelMensalComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/relatorios/receitas', pathMatch: 'full' }
  ]}
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
