import { Categoria } from "../categorias/categoria";
import { Conta } from "../contas/conta";
import { Fornecedor } from "../fornecedores/fornecedor";
import { Usuario } from "../usuarios/usuario";

export class Despesa {
  id?: number;
  descricao?: string;
  valor?: string;
  dataVencimento?: Date;
  dataPagamento?: Date;
  //usuario?: Usuario;
  usuarioId?: number;
  //fornecedor?: Fornecedor;
  fornecedorId?: number;
  //categoria?: Categoria;
  categoriaId?: number;
  //conta?: Conta;
  contaId?: number;
}
