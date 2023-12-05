import { ContaService } from './../conta.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Conta } from '../conta';
import { Subject } from 'rxjs';
import { LanguageApp } from 'src/app/internacionalizacao/internacionalizacao';

@Component({
  selector: 'app-listar-contas',
  templateUrl: './listar-contas.component.html',
  styleUrls: ['./listar-contas.component.css']
})

export class ListarContasComponent implements OnInit {

  listaContas: Conta[] = [];
  contaSelecionado!: Conta;
  acao: string = '';
  tituloModal: string = '';
  tituloBotaoModal: string = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();



  constructor(
    private contaService: ContaService,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: LanguageApp.pt_br_datatables
    };
    this.carregarContas();
  }

  carregarContas() {
    this.contaService.listar().subscribe((listaContas)=> {
      this.listaContas = listaContas;
      this.dtTrigger.next(null);
    });
  }


  prepararContaParaAcao(conta: Conta, acao: string) {
    this.contaSelecionado = conta;
    this.acao = acao;
    this.tituloModal = `Deseja realmente ${acao[0].toUpperCase() + acao.substr(1)} este conta?`;
    this.tituloBotaoModal = acao[0].toUpperCase() + acao.substr(1);
  }

  acaoModal(){
    if (this.acao && this.contaSelecionado && this.contaSelecionado.id){
      if(this.acao === 'deletar'){
        this.contaService.deletar(this.contaSelecionado.id).subscribe(()=>{
          this.ngOnInit();
        });
      }
    }
  }
}
