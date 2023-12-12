import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaService } from '../receitas.service';
import { MembroService } from 'src/app/membros/membro.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ContaService } from 'src/app/contas/conta.service';
import { Membro } from 'src/app/membros/membro';
import { Categoria } from '../../categorias/categoria';
import { Conta } from 'src/app/contas/conta';
import { Subject } from 'rxjs';
import { ReceitaDTO } from '../receitasDTO';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { Receita } from '../receitas';




@Component({
  selector: 'app-gerenciar-receitas',
  templateUrl: './gerenciar-receitas.component.html',
  styleUrls: ['./gerenciar-receitas.component.css'],
})
export class GerenciarReceitasComponent {
  receitaDTO: ReceitaDTO = new ReceitaDTO();
  listaMembros: Membro[] = [];
  errors?: String[];
  listaCategorias: Categoria[] = [];
  listaConta: Conta[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  dateRecebimento: string = '';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private receitaService: ReceitaService,
    private membroService: MembroService,
    private categoriaService: CategoriaService,
    private contaService: ContaService
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


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      //edicao
      this.receitaService.buscarPorId(parseInt(id)).subscribe((receita) => {
        this.receitaDTO.id = receita.id;
        this.receitaDTO.descricao = receita.descricao;
        this.receitaDTO.valor = receita.valor;
        if (receita.dataRecebimento?.toLocaleString().substring(0,10).toString()){
          console.log(receita.dataRecebimento?.toLocaleString().substring(0,10).toString());
          this.dateRecebimento = receita.dataRecebimento?.toLocaleString().substring(0,10).toString();
        }        
        this.receitaDTO.membroId = receita.membro?.id;
        this.receitaDTO.categoriaId = receita.categoria?.id
        this.receitaDTO.contaId = receita.conta?.id;

      });
    }
  }

  salvarReceita() {
    this.receitaDTO.dataRecebimento = new Date(this.dateRecebimento + 'T00:00:00');
    if (this.receitaDTO.id) {
      this.receitaService.editar(this.receitaDTO).subscribe({
        next: () => {
        this.router.navigate(['/receitas']);
        },
        error: (erro) => {
          console.log("erro");
          console.log(erro);
          console.log(" fim erro");
        }
    });
    } else {
      this.receitaService.criar(this.receitaDTO).subscribe({ 
        next: () => {
          this.router.navigate(['/receitas']);
        },
        error: (erro) => {
          console.log("erro");
          console.log(erro);
          console.log(" fim erro");
        }
      });
    }
  }

  cancelarReceita() {
    this.router.navigate(['/receitas']);
  }



}
