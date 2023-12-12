import { Component } from '@angular/core';
import { Membro } from '../membro';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private membroService: MembroService,
    private cepService: CepServiceService
  )
  {
    this.membro = new Membro;
    this.senhaConfirmacao ='';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { //edicao
      this.membroService.buscarPorId(parseInt(id)).subscribe((membro)=>{
        this.membro = membro;
      })
    }
  }

  consultaCep(){
    if (this.membro.cep) {
      this.cepService.buscar(this.membro.cep).subscribe((dados) => this.populaCEPForm(dados))
    }
  }

  populaCEPForm(dados: Cep){
    this.membro.logradouro = dados.logradouro;
    this.membro.bairro = dados.bairro;
    this.membro.cidade = dados.localidade;
    this.membro.uf = dados.uf;
  }

  

  salvarMembro() {
    if (this.membro.id) {
      console.log(this.membro)
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
