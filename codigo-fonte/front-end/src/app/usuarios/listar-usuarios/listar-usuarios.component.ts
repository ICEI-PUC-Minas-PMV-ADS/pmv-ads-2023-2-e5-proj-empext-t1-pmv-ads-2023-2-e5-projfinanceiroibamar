import { Component } from '@angular/core';
import { Usuario } from '../usuario';
import { Subject } from 'rxjs';
import { UsuarioService } from '../usuario.service';
import { LanguageApp } from 'src/app/internacionalizacao/internacionalizacao';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent {
  listaUsuarios: Usuario[] = [];
  usuarioSelecionado!: Usuario;
  acao: string = '';
  tituloModal: string = '';
  tituloBotaoModal: string = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();


  constructor(
    private usuarioService: UsuarioService,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: LanguageApp.pt_br_datatables
    };
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.listar()
    .subscribe((listaUsuarios)=> {
      this.listaUsuarios = listaUsuarios;
      this.dtTrigger.next(null);
    });
  }


  prepararUsuarioParaAcao(usuario: Usuario, acao: string) {
    this.usuarioSelecionado = usuario;
    this.acao = acao;
    this.tituloModal = `Deseja realmente ${acao[0].toUpperCase() + acao.substr(1)} este usuario?`;
    this.tituloBotaoModal = acao[0].toUpperCase() + acao.substr(1);
  }

  acaoModal(){
    if (this.acao && this.usuarioSelecionado && this.usuarioSelecionado.id){
      if(this.acao === 'desativar'){
        this.usuarioService.desativar(this.usuarioSelecionado.id).subscribe(()=>{
          this.ngOnInit();
        });
      }
    }
  }
}
