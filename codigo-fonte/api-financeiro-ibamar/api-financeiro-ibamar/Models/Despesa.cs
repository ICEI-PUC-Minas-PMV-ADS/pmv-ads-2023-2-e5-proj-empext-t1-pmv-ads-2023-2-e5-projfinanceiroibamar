using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api_financeiro_ibamar.Models
{
    [Table("Despesas")]
    public class Despesa
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a descricao!")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Nome!")]
        public double Valor { get; set; }

        //public DateTime DataLancamento { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Data de Vencimento!")]
        public DateTime DataVencimento { get; set; }

        public DateTime DataPagamento { get; set; }

        //public Usuario Usuario { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Usuario!")]
        public int UsuarioId { get; set; }

        [JsonIgnore]
        public virtual Fornecedor Fornecedor { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Fornecedor!")]
        public int FornecedorId { get; set; }

        // Categoria Categoria { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Categoria!")]
        public int CategoriaId { get; set; }

        //public Conta Conta { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Conta!")]
        public int ContaId { get; set; }
    }
}
