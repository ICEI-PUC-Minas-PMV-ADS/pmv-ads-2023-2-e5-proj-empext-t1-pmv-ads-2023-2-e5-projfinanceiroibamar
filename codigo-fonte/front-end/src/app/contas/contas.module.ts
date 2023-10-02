import { NgModule } from "@angular/core";
import { ListarContasComponent } from "./listar-contas/listar-contas.component";
import { DetalharContasComponent } from "./detalhar-contas/detalhar-contas.component";
import { CommonModule } from "@angular/common";
import { ContasRoutingModule } from "./contas-routing.module";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TemplateModule } from "../template/template.module";

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
  ],
  exports: [
    ListarContasComponent,
    DetalharContasComponent,
  ]
})
export class ContasModule { }
