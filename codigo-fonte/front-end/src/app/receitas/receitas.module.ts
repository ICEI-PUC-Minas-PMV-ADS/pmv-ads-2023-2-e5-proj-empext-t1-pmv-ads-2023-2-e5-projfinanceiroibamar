import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '../template/template.module';
import { DataTablesModule } from 'angular-datatables';

import { ReceitasRoutingModule } from './receitas-routing.module';
import { ListarReceitasComponent } from './listar-receitas/listar-receitas.component';
import { GerenciarReceitasComponent } from './gerenciar-receitas/gerenciar-receitas.component';

@NgModule({
  declarations: [
    ListarReceitasComponent,
    GerenciarReceitasComponent
  ],
  imports: [
    CommonModule,
    ReceitasRoutingModule,
    FormsModule,
    RouterModule,
    TemplateModule,
    DataTablesModule
  ]
})
export class ReceitasModule { }

