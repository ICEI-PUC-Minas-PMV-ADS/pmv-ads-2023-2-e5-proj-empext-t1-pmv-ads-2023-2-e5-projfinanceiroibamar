export class DespesaDTO {
  id?: number;
  descricao?: string;
  valor?: string;
  dataVencimento?: Date;
  dataPagamento?: Date;
  usuarioId?: number;
  fornecedorId?: number;
  categoriaId?: number;
  contaId?: number;
}
