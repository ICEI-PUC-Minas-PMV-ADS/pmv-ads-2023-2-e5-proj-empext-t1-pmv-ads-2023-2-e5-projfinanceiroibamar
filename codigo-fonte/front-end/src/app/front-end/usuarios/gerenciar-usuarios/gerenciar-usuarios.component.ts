import { Component } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.css']
})

export class GerenciarUsuariosComponent {
  usuario: Usuario = {
    nome: '',
    login: '',
    role: '',
    senha: '',
    ativo: false
  };
  senhaRepetida: String = '';


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
    ) { }


    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) { //edicao
        this.usuarioService.buscarPorId(parseInt(id)).subscribe((usuario)=>{
          this.usuario = usuario
        })
      }

    }

    salvarUsuario() {
      if (this.usuario.id) {
        this.usuarioService.editar(this.usuario).subscribe(()=>{
          this.router.navigate(['/usuarios'])
        });
      }
      else {
        this.usuarioService.criar(this.usuario).subscribe(()=>{
          this.router.navigate(['/usuarios'])
        });
      }
    }

    cancelarUsuario(){
      this.router.navigate(['/usuarios'])
    }
}
