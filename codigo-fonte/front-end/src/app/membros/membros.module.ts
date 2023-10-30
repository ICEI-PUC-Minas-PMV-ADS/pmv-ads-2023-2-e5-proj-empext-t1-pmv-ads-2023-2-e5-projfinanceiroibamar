import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembrosRoutingModule } from './membros-routing.module';
import { ListarMembrosComponent } from './listar-membros/listar-membros.component';
import { GerenciarMembrosComponent } from './gerenciar-membros/gerenciar-membros.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '../template/template.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ListarMembrosComponent,
    GerenciarMembrosComponent
  ],
  imports: [
    CommonModule,
    MembrosRoutingModule,
    FormsModule,
    RouterModule,
    TemplateModule,
    DataTablesModule,
  ]
})
export class MembrosModule { }
