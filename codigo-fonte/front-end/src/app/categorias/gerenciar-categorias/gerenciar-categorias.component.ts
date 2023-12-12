import { Component } from '@angular/core';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gerenciar-categorias',
  templateUrl: './gerenciar-categorias.component.html',
  styleUrls: ['./gerenciar-categorias.component.css']
})

export class GerenciarCategoriasComponent {
  categoria: Categoria = {
    descricao: '',
  };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
    ) { }


    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) { //edicao
        this.categoriaService.buscarPorId(parseInt(id)).subscribe((categoria)=>{
          this.categoria = categoria
        })
      }

    }

    salvarCategoria() {
      if (this.categoria.id) {
        this.categoriaService.editar(this.categoria).subscribe(()=>{
          this.router.navigate(['/categorias'])
        });
      }
      else {
        this.categoriaService.criar(this.categoria).subscribe(()=>{
          this.router.navigate(['/categorias'])
        });
      }
    }

    cancelarCategoria(){
      this.router.navigate(['/categorias'])
    }
}
