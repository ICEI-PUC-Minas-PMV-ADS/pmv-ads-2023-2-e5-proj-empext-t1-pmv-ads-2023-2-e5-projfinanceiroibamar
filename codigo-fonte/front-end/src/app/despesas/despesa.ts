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
  usuario?: Usuario;
  fornecedor?: Fornecedor;
  categoria?: Categoria;
  conta?: Conta;
}
