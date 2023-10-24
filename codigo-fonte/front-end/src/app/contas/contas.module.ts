import { NgModule } from "@angular/core";
import { ListarContasComponent } from "./listar-contas/listar-contas.component";
import { DetalharContasComponent } from "./detalhar-contas/detalhar-contas.component";
import { CommonModule } from "@angular/common";
import { ContasRoutingModule } from "./contas-routing.module";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TemplateModule } from "../template/template.module";
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ListarContasComponent,
    DetalharContasComponent,

  ],
  imports: [
    CommonModule,
    ContasRoutingModule,
    FormsModule,
    RouterModule,
    TemplateModule,
    DataTablesModule,
  ],
  exports: [
    ListarContasComponent,
    DetalharContasComponent,
  ]
})
export class ContasModule { }
