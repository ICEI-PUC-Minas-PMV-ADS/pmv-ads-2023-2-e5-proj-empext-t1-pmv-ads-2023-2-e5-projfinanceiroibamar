import { Component } from '@angular/core';
import { Despesa } from 'src/app/despesas/despesa';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesaService } from '../despesas.service';
import { MembroService } from 'src/app/membros/membro.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ContaService } from 'src/app/contas/conta.service';
import { Membro } from 'src/app/membros/membro';
import { Categoria } from '../../categorias/categoria';
import { Conta } from 'src/app/contas/conta';
import { Usuario } from 'src/app/usuarios/usuario';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { Subject } from 'rxjs';

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
    membro: new Membro(),
    categoria: new Categoria(),
    conta: new Conta(),
  };
  listaMembros: Membro[] = [];
  errors?: String[];
  listaCategorias: Categoria[] = [];
  listaConta: Conta[] = [];
  listaUsuarios: Usuario[] = [];
  authService: any;
  listaContas: any;
  dtTrigger: Subject<any> = new Subject<any>();
  idMembroSelecionado: number = 0;
  membroSelecionado: Membro = new Membro();
  idContaSelecionado: number = 0;
  contaSelecionado: Conta = new Conta();
  idCategoriaSelecionado: number = 0;
  categoriaSelecionado: Categoria = new Categoria();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private despesaService: DespesaService,
    private membroService: MembroService,
    private categoriaService: CategoriaService,
    private contaService: ContaService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.membroService.listar().subscribe((listaMembro) => {
      this.listaMembros = listaMembro;
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
    if (this.membroSelecionado) {
      this.despesa.membro = this.membroSelecionado;
    }
    if (this.contaSelecionado) {
      this.despesa.conta = this.contaSelecionado;
    }
    if (this.categoriaSelecionado) {
      this.despesa.categoria = this.categoriaSelecionado;
    }

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

  preencherDadosMembro() {
    this.membroService.buscarPorId(this.idMembroSelecionado).subscribe((membro) => {
      this.membroSelecionado = membro;
    });
  }

  preencherDadosConta() {
    this.contaService.buscarPorId(this.idContaSelecionado).subscribe((conta) => {
      this.contaSelecionado = conta;
    });
  }

  preencherDadosCategoria() {
    this.categoriaService.buscarPorId(this.idCategoriaSelecionado).subscribe((categoria) => {
      this.categoriaSelecionado = categoria;
    });
  }
}
