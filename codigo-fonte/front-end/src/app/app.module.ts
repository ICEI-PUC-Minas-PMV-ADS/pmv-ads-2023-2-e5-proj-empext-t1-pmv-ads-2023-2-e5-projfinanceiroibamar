import { TemplateModule } from './template/template.module';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';
import { NgxMaskModule } from "ngx-mask";
import { PrincipalComponent } from './principal/principal.component';
import { ContasModule } from './contas/contas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MembrosModule } from './membros/membros.module';
import { FornecedoresModule } from './fornecedores/fornecedores.module';
import { ReceitasModule } from './receitas/receitas.module';
import { DespesasModule } from './despesas/despesas.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    PrincipalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    TemplateModule,
    ContasModule,
    CategoriasModule,
    UsuariosModule,
    MembrosModule,
    FornecedoresModule,
    ReceitasModule,
    DespesasModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
