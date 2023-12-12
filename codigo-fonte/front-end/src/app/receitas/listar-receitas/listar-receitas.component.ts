import { Component } from '@angular/core';
import { Receita } from '../receitas';
import { Subject } from 'rxjs';
import { ReceitaService } from '../receitas.service';
import { LanguageApp } from 'src/app/internacionalizacao/internacionalizacao';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-listar-receitas',
  templateUrl: 'listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.css']
})
export class ListarReceitasComponent {
  listaReceitas: Receita[] = [];
  receitaSelecionada!: Receita;
  acao: string = '';
  tituloModal: string = '';
  tituloBotaoModal: string = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private receitaService: ReceitaService,
    private sanitizer: DomSanitizer) 
  { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: LanguageApp.pt_br_datatables
    };
    this.carregarReceitas();
  }

  carregarReceitas() {
    this.receitaService.listar()
      .subscribe((listaReceitas) => {
        this.listaReceitas = listaReceitas;
        this.dtTrigger.next(null);
      });
  }

  prepararReceitaParaAcao(receita: Receita, acao: string) {
    this.receitaSelecionada = receita;
    this.acao = acao;
    this.tituloModal = `Deseja realmente ${acao[0].toUpperCase() + acao.substr(1)} esta receita?`;
    this.tituloBotaoModal = acao[0].toUpperCase() + acao.substr(1);
  }

  acaoModal() {
    if (this.acao && this.receitaSelecionada && this.receitaSelecionada.id) {
      if (this.acao === 'deletar') {
        this.receitaService.deletar(this.receitaSelecionada.id).subscribe(() => {
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
