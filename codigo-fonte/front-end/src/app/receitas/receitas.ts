import { Categoria } from "../categorias/categoria";
import { Conta } from "../contas/conta";
import { Membro } from "../membros/membro";
import { Usuario } from "../usuarios/usuario";

export class Receita {
  id?: number;
  descricao?: string;
  valor?: number;
  dataLancamento?: Date;
  dataRecebimento?: Date;
  //usuario?: Usuario;
  usuarioId?: number;
  membroId?: number;
  categoriaId?: number;
  contaId?: number;
  //membro?: Membro;
  //categoria?: Categoria;
  //conta?: Conta;
}
