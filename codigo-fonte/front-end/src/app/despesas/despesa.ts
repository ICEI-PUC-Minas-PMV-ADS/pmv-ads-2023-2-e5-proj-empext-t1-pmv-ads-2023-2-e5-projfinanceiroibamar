import { Categoria } from "../categorias/categoria";
import { Conta } from "../contas/conta";
import { Membro } from "../membros/membro";
import { Usuario } from "../usuarios/usuario";

export class Despesa {
  id?: number;
  descricao?: string;
  valor?: string;
  dataVencimento?: Date;
  dataPagamento?: Date;
  usuario?: Usuario;
  usuarioId?: number;
  membro?: Membro;
  categoria?: Categoria;
  conta?: Conta;
}
