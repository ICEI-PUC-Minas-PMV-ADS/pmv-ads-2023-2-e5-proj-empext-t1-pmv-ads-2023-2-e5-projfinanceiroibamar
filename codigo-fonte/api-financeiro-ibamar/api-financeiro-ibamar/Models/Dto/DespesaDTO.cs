using System.ComponentModel.DataAnnotations;

namespace api_financeiro_ibamar.Models.Dto
{
    public class DespesaDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a descricao!")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Valor!")]
        public double Valor { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Data de Vencimento!")]
        public DateTime DataVencimento { get; set; }

        public DateTime DataPagamento { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Usuário!")]
        public int UsuarioId { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Fornecedor!")]
        public int FornecedorId { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Categoria!")]
        public int CategoriaId { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Conta!")]
        public int ContaId { get; set; }



        public Despesa despesaDtoToDespesa()
        {
            var despesa = new Despesa();
            despesa.Descricao = this.Descricao;
            despesa.Valor = this.Valor;
            despesa.DataVencimento = this.DataVencimento;
            despesa.DataPagamento = this.DataPagamento;
            despesa.FornecedorId = this.FornecedorId;
            despesa.CategoriaId = this.CategoriaId;
            despesa.ContaId = this.ContaId;

            return despesa;
        }
    }
}
