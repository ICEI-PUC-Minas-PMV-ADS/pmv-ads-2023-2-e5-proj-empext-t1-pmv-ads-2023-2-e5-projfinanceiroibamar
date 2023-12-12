import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReceitaService } from 'src/app/receitas/receitas.service';
import { RelatorioReceitaDTO } from './relatorio-receita';
import { MembroService } from 'src/app/membros/membro.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ContaService } from 'src/app/contas/conta.service';
import { Categoria } from 'src/app/categorias/categoria';
import { Conta } from 'src/app/contas/conta';
import { Membro } from 'src/app/membros/membro';

@Component({
  selector: 'app-rel-receitas',
  templateUrl: './rel-receitas.component.html',
  styleUrls: ['./rel-receitas.component.css']
})
export class RelReceitasComponent {

  pdfSrc: SafeResourceUrl = '';
  relatorioReceitaDTO: RelatorioReceitaDTO = new RelatorioReceitaDTO();
  errors?: String[];
  listaMembros: Membro[] = [];
  listaCategorias: Categoria[] = [];
  listaConta: Conta[] = [];

  constructor(private receitaService: ReceitaService,
    private sanitizer: DomSanitizer,
    private membroService: MembroService,
    private categoriaService: CategoriaService,
    private contaService: ContaService) 
  { }

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
  }

  relatorioReceitas() {
    this.pdfSrc = '';
    this.receitaService.downloadPdfReceitas(this.relatorioReceitaDTO).subscribe(data => {
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    });    
    
  }

}
