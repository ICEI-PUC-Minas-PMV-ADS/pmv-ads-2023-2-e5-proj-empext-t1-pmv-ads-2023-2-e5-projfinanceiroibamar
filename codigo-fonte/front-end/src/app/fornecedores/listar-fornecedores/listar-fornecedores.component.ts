import { Component } from '@angular/core';
import { Fornecedor } from '../fornecedor';
import { Subject } from 'rxjs';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.css']
})
export class ListarFornecedoresComponent {
  listaFornecedores: Fornecedor[] = [];
  fornecedorSelecionado!: Fornecedor;
  acao: string = '';
  tituloModal: string = '';
  tituloBotaoModal: string = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();


  constructor(
    private fornecedorService: FornecedorService,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.carregarFornecedors();
  }

  carregarFornecedors() {
    this.fornecedorService.listar()
    .subscribe((listaFornecedors)=> {
      this.listaFornecedores = listaFornecedors;
      this.dtTrigger.next(null);
    });
  }


  prepararFornecedorParaAcao(fornecedor: Fornecedor, acao: string) {
    this.fornecedorSelecionado = fornecedor;
    this.acao = acao;
    this.tituloModal = `Deseja realmente ${acao[0].toUpperCase() + acao.substr(1)} este fornecedor?`;
    this.tituloBotaoModal = acao[0].toUpperCase() + acao.substr(1);
  }

  acaoModal(){
    if (this.acao && this.fornecedorSelecionado && this.fornecedorSelecionado.id){
      if(this.acao === 'deletar'){
        this.fornecedorService.deletar(this.fornecedorSelecionado.id).subscribe(()=>{
          this.ngOnInit();
        });
      }
    }
  }
}
