import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { ListarFornecedoresComponent } from './listar-fornecedores/listar-fornecedores.component';
import { GerenciarFornecedoresComponent } from './gerenciar-fornecedores/gerenciar-fornecedores.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '../template/template.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ListarFornecedoresComponent,
    GerenciarFornecedoresComponent
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    FormsModule,
    RouterModule,
    TemplateModule,
    DataTablesModule,
  ]
})
export class FornecedoresModule { }
