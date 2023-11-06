import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '../template/template.module';
import { DataTablesModule } from 'angular-datatables';

import { DespesasRoutingModule } from './despesas-routing.module';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { GerenciarDespesasComponent } from './gerenciar-despesas/gerenciar-despesas.component';

@NgModule({
  declarations: [
    ListarDespesasComponent,
    GerenciarDespesasComponent
  ],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    FormsModule,
    RouterModule,
    TemplateModule,
    DataTablesModule
  ]
})
export class DespesasModule { }

