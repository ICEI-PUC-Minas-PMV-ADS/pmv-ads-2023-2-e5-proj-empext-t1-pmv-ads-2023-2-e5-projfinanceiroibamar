import { Component } from '@angular/core';
import { Membro } from '../membro';
import { Subject } from 'rxjs';
import { MembroService } from '../membro.service';
import { LanguageApp } from 'src/app/internacionalizacao/internacionalizacao';

@Component({
  selector: 'app-listar-membros',
  templateUrl: './listar-membros.component.html',
  styleUrls: ['./listar-membros.component.css']
})
export class ListarMembrosComponent {
  listaMembros: Membro[] = [];
  membroSelecionado!: Membro;
  acao: string = '';
  tituloModal: string = '';
  tituloBotaoModal: string = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();

  constructor(
    private membroService: MembroService,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: LanguageApp.pt_br_datatables
    };
    this.carregarMembros();
  }

  carregarMembros() {
    this.membroService.listar()
    .subscribe((listaMembros)=> {
      this.listaMembros = listaMembros;
      this.dtTrigger.next(null);
    });
  }


  prepararMembroParaAcao(membro: Membro, acao: string) {
    this.membroSelecionado = membro;
    this.acao = acao;
    this.tituloModal = `Deseja realmente ${acao[0].toUpperCase() + acao.substr(1)} este membro?`;
    this.tituloBotaoModal = acao[0].toUpperCase() + acao.substr(1);
  }

  acaoModal(){
    if (this.acao && this.membroSelecionado && this.membroSelecionado.id){
      if(this.acao === 'deletar'){
        this.membroService.deletar(this.membroSelecionado.id).subscribe(()=>{
          this.ngOnInit();
        });
      }
    }
  }
}
