import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';

import { RouterModule } from '@angular/router';
import { TemplateModule } from '../template/template.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ListarUsuariosComponent,
    GerenciarUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    RouterModule,
    TemplateModule,
    FormsModule,
    DataTablesModule
  ]
})
export class UsuariosModule { }
