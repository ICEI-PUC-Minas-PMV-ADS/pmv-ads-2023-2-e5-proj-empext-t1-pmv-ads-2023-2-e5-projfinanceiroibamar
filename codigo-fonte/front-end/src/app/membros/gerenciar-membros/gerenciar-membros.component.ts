import { Component } from '@angular/core';
import { Membro } from '../membro';
import { Router } from '@angular/router';
import { MembroService } from '../membro.service';
import { CepServiceService } from 'src/app/cep/cep-service.service';
import { Cep } from 'src/app/cep/cep';

@Component({
  selector: 'app-gerenciar-membros',
  templateUrl: './gerenciar-membros.component.html',
  styleUrls: ['./gerenciar-membros.component.css']
})
export class GerenciarMembrosComponent {
  membro: Membro;
  senhaConfirmacao: string;
  errors?: String[];

  constructor(
    private router: Router,
    private membroService: MembroService,
    private cepService: CepServiceService
  ){
    this.membro = new Membro;
    this.senhaConfirmacao ='';
   }

   ngOnInit(): void {
  }

  consultaCep(){
    if (this.membro.cep) {
      this.cepService.buscar(this.membro.cep).subscribe((dados) => this.populaForm(dados))
    }
  }

  populaForm(dados: Cep){
    this.membro.logradouro = dados.logradouro;
    this.membro.bairro = dados.bairro;
    this.membro.cidade = dados.localidade;
    this.membro.uf = dados.uf;
  }

  

  salvarMembro() {
    if (this.membro.id) {
      this.membroService.editar(this.membro).subscribe(()=>{
        this.router.navigate(['/membros'])
      });
    }
    else {
      this.membroService.criar(this.membro).subscribe(()=>{
        this.router.navigate(['/membros'])
      });
    }
  }

  cancelarMembro(){
    this.router.navigate(['/membros'])
  }

}
