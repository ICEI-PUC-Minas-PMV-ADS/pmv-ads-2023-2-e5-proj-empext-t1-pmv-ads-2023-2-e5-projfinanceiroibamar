import { Component } from '@angular/core';
import { Receita } from '../receitas';
import { Subject } from 'rxjs';
import { ReceitaService } from '../receitas.service';

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

  constructor(private receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
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
}
