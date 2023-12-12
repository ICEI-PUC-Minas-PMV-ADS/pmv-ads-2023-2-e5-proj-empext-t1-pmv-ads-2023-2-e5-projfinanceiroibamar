import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelReceitasComponent } from './rel-receitas/rel-receitas.component';
import { RelDespesasComponent } from './rel-despesas/rel-despesas.component';
import { RelMensalComponent } from './rel-mensal/rel-mensal.component';


@NgModule({
  declarations: [
    RelReceitasComponent,
    RelDespesasComponent,
    RelMensalComponent
  ],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    FormsModule,
  ]
})
export class RelatoriosModule { }
