import { Component } from '@angular/core';
import { Despesa } from 'src/app/despesas/despesa';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesaService } from '../despesas.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ContaService } from 'src/app/contas/conta.service';
import { Categoria } from '../../categorias/categoria';
import { Conta } from 'src/app/contas/conta';
import { Subject } from 'rxjs';
import { FornecedorService } from 'src/app/fornecedores/fornecedor.service';
import { Fornecedor } from 'src/app/fornecedores/fornecedor';
import { DespesaDTO } from '../despesaDTO';

@Component({
  selector: 'app-gerenciar-despesas',
  templateUrl: './gerenciar-despesas.component.html',
  styleUrls: ['./gerenciar-despesas.component.css'],
})
export class GerenciarDespesasComponent {
  despesaDTO: DespesaDTO = new DespesaDTO();
  listaFornecedor: Fornecedor[] = [];
  errors?: String[];
  listaCategorias: Categoria[] = [];
  listaConta: Conta[] = [];
  authService: any;
  listaContas: any;
  dtTrigger: Subject<any> = new Subject<any>();
  dateVencimento: string = '';
  datePagamento: string = '';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private despesaService: DespesaService,
    private fornecedorService: FornecedorService,
    private categoriaService: CategoriaService,
    private contaService: ContaService,
  ) {}

  ngOnInit(): void {
    this.fornecedorService.listar().subscribe((listaFornecedor) => {
      this.listaFornecedor = listaFornecedor;
    });

    this.categoriaService.listar().subscribe((listaCategoria) => {
      this.listaCategorias = listaCategoria;
    });

    this.contaService.listar().subscribe((listaConta) => {
      this.listaConta = listaConta;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.despesaService.buscarPorId(parseInt(id)).subscribe((despesa) => {
        this.despesaDTO.id = despesa.id
        this.despesaDTO.descricao = despesa.descricao;
        this.despesaDTO.valor = despesa.valor;
        if (despesa.dataVencimento?.toLocaleString().substring(0,10).toString()){
          console.log(despesa.dataVencimento?.toLocaleString().substring(0,10).toString());
          this.dateVencimento = despesa.dataVencimento?.toLocaleString().substring(0,10).toString();
        }
        if (despesa.dataPagamento?.toLocaleString().substring(0,10).toString()){
          console.log(despesa.dataPagamento?.toLocaleString().substring(0,10).toString());
          this.datePagamento = despesa.dataPagamento?.toLocaleString().substring(0,10).toString();
        }
        
        this.despesaDTO.fornecedorId = despesa.fornecedor?.id;
        this.despesaDTO.categoriaId = despesa.categoria?.id
        this.despesaDTO.contaId = despesa.conta?.id;
      });
    }
  }

  salvarDespesa() {
    this.despesaDTO.dataVencimento = new Date(this.dateVencimento + 'T00:00:00');
    this.despesaDTO.dataPagamento = new Date(this.datePagamento + 'T00:00:00');
    if (this.despesaDTO.id) {
      this.despesaService.editar(this.despesaDTO).subscribe(() => {
        this.router.navigate(['/despesas']);
      });
    } else {
      this.despesaService.criar(this.despesaDTO).subscribe(() => {
        this.router.navigate(['/despesas']);
      });
    }
  }

  cancelarDespesa() {
    this.router.navigate(['/despesas']);
  }

  
}
