import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RelatorioDespesaDTO } from './relatorio-despesa';
import { Fornecedor } from 'src/app/fornecedores/fornecedor';
import { Categoria } from 'src/app/categorias/categoria';
import { Conta } from 'src/app/contas/conta';
import { DespesaService } from 'src/app/despesas/despesas.service';
import { FornecedorService } from 'src/app/fornecedores/fornecedor.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ContaService } from 'src/app/contas/conta.service';

@Component({
  selector: 'app-rel-despesas',
  templateUrl: './rel-despesas.component.html',
  styleUrls: ['./rel-despesas.component.css']
})
export class RelDespesasComponent {

  pdfSrc: SafeResourceUrl = '';
  relatorioDespesaDTO: RelatorioDespesaDTO = new RelatorioDespesaDTO();
  errors?: String[];
  listaFornecedors: Fornecedor[] = [];
  listaCategorias: Categoria[] = [];
  listaConta: Conta[] = [];

  constructor(private despesaService: DespesaService,
    private sanitizer: DomSanitizer,
    private fornecedorService: FornecedorService,
    private categoriaService: CategoriaService,
    private contaService: ContaService) 
  { }

  ngOnInit(): void {
    this.fornecedorService.listar().subscribe((listaFornecedor) => {
      this.listaFornecedors = listaFornecedor;
    });

    this.categoriaService.listar().subscribe((listaCategoria) => {
      this.listaCategorias = listaCategoria;
    });
     this.contaService.listar().subscribe((listaConta) => {
       this.listaConta = listaConta;
     });
  }

  relatorioDespesas() {
    this.pdfSrc = '';
    this.despesaService.downloadPdfDespesas(this.relatorioDespesaDTO).subscribe(data => {
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    });    
    
  }

}
