import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '../template/template.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { GerenciarCategoriasComponent } from './gerenciar-categorias/gerenciar-categorias.component';


@NgModule({
  declarations: [
    ListarCategoriasComponent,
    GerenciarCategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    FormsModule,
    RouterModule,
    TemplateModule,
    DataTablesModule,
  ],
  exports: [
    ListarCategoriasComponent,
    GerenciarCategoriasComponent
  ]
})
export class CategoriasModule { }
