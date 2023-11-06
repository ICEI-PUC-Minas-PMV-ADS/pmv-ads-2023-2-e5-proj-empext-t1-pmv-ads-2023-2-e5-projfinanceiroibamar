import { Component } from '@angular/core';
import { Receita } from '../receitas';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaService } from '../receitas.service';
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
  selector: 'app-gerenciar-receitas',
  templateUrl: './gerenciar-receitas.component.html',
  styleUrls: ['./gerenciar-receitas.component.css'],
})
export class GerenciarReceitasComponent {
  receita: Receita = {
    id: 0,
    descricao: '',
    valor: 0,
    //dataLancamento?: Date;
    dataRecebimento: new Date(),
    usuarioId: 0,
    membroId: 0,
    categoriaId: 0,
    contaId: 0,
  };
  listaMembros: Membro[] = [];
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
    private receitaService: ReceitaService,
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
      //edicao
      this.receitaService.buscarPorId(parseInt(id)).subscribe((receita) => {
        this.receita = receita;
      });
    }
  }

  salvarReceita() {
    console.log(this.receita)
    if (this.receita.id) {
      this.receitaService.editar(this.receita).subscribe(() => {
        this.router.navigate(['/receitas']);
      });
    } else {
      this.receitaService.criar(this.receita).subscribe(() => {
        this.router.navigate(['/receitas']);
      });
    }
  }

  cancelarReceita() {
    this.router.navigate(['/receitas']);
  }

}
