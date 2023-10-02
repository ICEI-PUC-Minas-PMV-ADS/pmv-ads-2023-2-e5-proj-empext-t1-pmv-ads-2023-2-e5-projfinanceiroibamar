import { ContaService } from './../conta.service';
import { Component } from '@angular/core';
import { Conta } from '../conta';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-listar-contas',
  templateUrl: './listar-contas.component.html',
  styleUrls: ['./listar-contas.component.css']
})
export class ListarContasComponent {

  listaContas: Conta[] = [];
  contaSelecionado!: Conta;
  acao: string = '';
  tituloModal: string = '';
  tituloBotaoModal: string = '';

  constructor(
    private contaService: ContaService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.contaService.listar(this.authService.getUsuarioId()).subscribe((listaContas)=> {
      this.listaContas = listaContas;
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
      if(this.acao === 'enviar'){
        if(this.contaSelecionado.saldo == 0) {
          alert("Valor do Conta zerado!!!");
          return
        }
        this.contaService.enviar(this.contaSelecionado.id).subscribe(()=>{
          console.log("enviar");
          this.ngOnInit();
        });
      }
    }

  }


}
