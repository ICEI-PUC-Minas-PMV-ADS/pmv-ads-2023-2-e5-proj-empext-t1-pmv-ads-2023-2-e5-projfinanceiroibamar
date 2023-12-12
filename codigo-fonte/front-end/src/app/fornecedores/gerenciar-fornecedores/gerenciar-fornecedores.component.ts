import { Component } from '@angular/core';
import { Fornecedor } from '../fornecedor';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../fornecedor.service';
import { CepServiceService } from 'src/app/cep/cep-service.service';
import { Cep } from 'src/app/cep/cep';

@Component({
  selector: 'app-gerenciar-fornecedores',
  templateUrl: './gerenciar-fornecedores.component.html',
  styleUrls: ['./gerenciar-fornecedores.component.css']
})
export class GerenciarFornecedoresComponent {
  fornecedor: Fornecedor;
  senhaConfirmacao: string;
  errors?: String[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
    private cepService: CepServiceService
  ){
    this.fornecedor = new Fornecedor;
    this.senhaConfirmacao ='';
   }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { //edicao
      this.fornecedorService.buscarPorId(parseInt(id)).subscribe((fornecedor)=>{
        this.fornecedor = fornecedor;
      })
    }
  }

  consultaCep(){
    if (this.fornecedor.cep) {
      this.cepService.buscar(this.fornecedor.cep).subscribe((dados) => this.populaForm(dados))
    }
  }

  populaForm(dados: Cep){
    this.fornecedor.logradouro = dados.logradouro;
    this.fornecedor.bairro = dados.bairro;
    this.fornecedor.cidade = dados.localidade;
    this.fornecedor.uf = dados.uf;
  }

  

  salvarFornecedor() {
    if (this.fornecedor.id) {
      this.fornecedorService.editar(this.fornecedor).subscribe(()=>{
        this.router.navigate(['/fornecedores'])
      });
    }
    else {
      this.fornecedorService.criar(this.fornecedor).subscribe(()=>{
        this.router.navigate(['/fornecedores'])
      });
    }
  }

  cancelarFornecedor(){
    this.router.navigate(['/fornecedores'])
  }

}
