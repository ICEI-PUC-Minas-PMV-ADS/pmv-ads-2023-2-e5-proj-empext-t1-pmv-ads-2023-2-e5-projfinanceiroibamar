import { Component } from '@angular/core';
import { Conta } from '../conta';
import { ContaService } from '../conta.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhar-contas',
  templateUrl: './detalhar-contas.component.html',
  styleUrls: ['./detalhar-contas.component.css']
})
export class DetalharContasComponent {
  conta: Conta = {
    saldo: 0,
    descricao: '',
  };



  constructor(
    private contaService: ContaService,
    private router: Router,
    private route: ActivatedRoute
    ) { }


    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) { //edicao
        this.contaService.buscarPorId(parseInt(id)).subscribe((conta)=>{
          this.conta = conta
        })
      }

    }

    salvarConta() {
      if (this.conta.id) {
        this.contaService.editar(this.conta).subscribe(()=>{
          this.router.navigate(['/contas'])
        });
      }
      else {
        this.contaService.criar(this.conta).subscribe(()=>{
          this.router.navigate(['/contas'])
        });
      }
    }

    cancelarConta(){
      this.router.navigate(['/contas'])
    }






}
