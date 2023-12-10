import { Component } from '@angular/core';
import { Despesa } from 'src/app/despesas/despesa';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesaService } from '../despesas.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ContaService } from 'src/app/contas/conta.service';
import { Membro } from 'src/app/membros/membro';
import { Categoria } from '../../categorias/categoria';
import { Conta } from 'src/app/contas/conta';
import { Usuario } from 'src/app/usuarios/usuario';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { Subject } from 'rxjs';
import { FornecedorService } from 'src/app/fornecedores/fornecedor.service';
import { Fornecedor } from 'src/app/fornecedores/fornecedor';

@Component({
  selector: 'app-gerenciar-despesas',
  templateUrl: './gerenciar-despesas.component.html',
  styleUrls: ['./gerenciar-despesas.component.css'],
})
export class GerenciarDespesasComponent {
  despesa: Despesa = {
    id: 0,
    descricao: '',
    valor: "",
    dataPagamento: new Date(),
    dataVencimento: new Date(),
    usuarioId: 0,
    fornecedorId: 0,
    categoriaId: 0,
    contaId: 0,
  };
  listaFornecedor: Fornecedor[] = [];
  errors?: String[];
  listaCategorias: Categoria[] = [];
  listaConta: Conta[] = [];
  listaUsuarios: Usuario[] = [];
  authService: any;
  listaContas: any;
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private despesaService: DespesaService,
    private fornecedorService: FornecedorService,
    private categoriaService: CategoriaService,
    private contaService: ContaService,
    private usuarioService: UsuarioService,
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

    this.usuarioService.listar().subscribe((listaUsuario) => {
      this.listaUsuarios = listaUsuario;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.despesaService.buscarPorId(parseInt(id)).subscribe((despesa) => {
        this.despesa = despesa;
      });
    }
  }

  salvarDespesa() {
    console.log(this.despesa)
    if (this.despesa.id) {
      this.despesaService.editar(this.despesa).subscribe(() => {
        this.router.navigate(['/despesas']);
      });
    } else {
      this.despesaService.criar(this.despesa).subscribe(() => {
        this.router.navigate(['/despesas']);
      });
    }
  }

  cancelarDespesa() {
    this.router.navigate(['/despesas']);
  }

  
}