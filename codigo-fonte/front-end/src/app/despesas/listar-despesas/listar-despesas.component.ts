import { Component } from '@angular/core';
import { Despesa } from 'src/app/despesas/despesa';
import { Subject } from 'rxjs';
import { DespesaService } from '../despesas.service';
import { LanguageApp } from 'src/app/internacionalizacao/internacionalizacao';

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
      pagingType: 'full_numbers',
      language: LanguageApp.pt_br_datatables
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

  formatDate(date: any): string {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    const formattedToday = this.lpad(dd,2) + '/' + this.lpad(mm,2) + '/' + yyyy;
    return formattedToday
  }

  lpad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  formatNumber(num:any): string {
    // Specifying options for formatting
    const options = {
      style: 'decimal',  // Other options: 'currency', 'percent', etc.
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return num.toLocaleString('en-US', options);
  }
}

