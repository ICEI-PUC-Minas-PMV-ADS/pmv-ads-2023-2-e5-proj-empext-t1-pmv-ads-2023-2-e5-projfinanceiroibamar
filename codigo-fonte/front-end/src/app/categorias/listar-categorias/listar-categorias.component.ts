import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent {
  listaCategorias: Categoria[] = [];
  categoriaSelecionado!: Categoria;
  acao: string = '';
  tituloModal: string = '';
  tituloBotaoModal: string = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();


  constructor(
    private categoriaService: CategoriaService,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.listar()
    .subscribe((listaCategorias)=> {
      this.listaCategorias = listaCategorias;
      this.dtTrigger.next(null);
    });
  }


  prepararCategoriaParaAcao(categoria: Categoria, acao: string) {
    this.categoriaSelecionado = categoria;
    this.acao = acao;
    this.tituloModal = `Deseja realmente ${acao[0].toUpperCase() + acao.substr(1)} este categoria?`;
    this.tituloBotaoModal = acao[0].toUpperCase() + acao.substr(1);
  }

  acaoModal(){
    if (this.acao && this.categoriaSelecionado && this.categoriaSelecionado.id){
      if(this.acao === 'deletar'){
        this.categoriaService.deletar(this.categoriaSelecionado.id).subscribe(()=>{
          this.ngOnInit();
        });
      }
    }
  }
}
