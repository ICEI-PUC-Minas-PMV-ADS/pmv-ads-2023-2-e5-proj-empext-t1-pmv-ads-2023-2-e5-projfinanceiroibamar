import { Component } from '@angular/core';
import { Despesa } from 'src/app/despesas/despesa';
import { Subject } from 'rxjs';
import { DespesaService } from '../despesas.service';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: 'listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent {
  listaDespesas: Despesa[] = [];
  despesaSelecionada!: Despesa;
  acao: string = '';
  tituloModal: string = '';
  tituloBotaoModal: string = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private despesaService: DespesaService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.carregarDespesas();
  }

  carregarDespesas() {
    this.despesaService.listar()
      .subscribe((listaDespesas) => {
        this.listaDespesas = listaDespesas;
        this.dtTrigger.next(null);
      });
  }

  prepararDespesaParaAcao(despesa: Despesa, acao: string) {
    this.despesaSelecionada = despesa;
    this.acao = acao;
    this.tituloModal = `Deseja realmente ${acao[0].toUpperCase() + acao.substr(1)} esta despesa?`;
    this.tituloBotaoModal = acao[0].toUpperCase() + acao.substr(1);
  }

  acaoModal() {
    if (this.acao && this.despesaSelecionada && this.despesaSelecionada.id) {
      if (this.acao === 'deletar') {
        this.despesaService.deletar(this.despesaSelecionada.id).subscribe(() => {
          this.ngOnInit();
        });
      }
    }
  }
}

