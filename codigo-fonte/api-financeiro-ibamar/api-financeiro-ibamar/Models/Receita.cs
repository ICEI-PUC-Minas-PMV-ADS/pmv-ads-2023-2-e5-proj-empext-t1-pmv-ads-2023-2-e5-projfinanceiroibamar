using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_financeiro_ibamar.Models
{

    [Table("Receitas")]
    public class Receita
    {

        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a descricao!")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Nome!")]
        public string Valor { get; set; }

        DateTime DataLancamento { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Data de Vencimento!")]
        public DateTime DataRecebimento { get; set; }

        public Usuario Usuario { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Usuario!")]
        public int UsuarioId { get; set; }

        public Membro Membro { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Membro!")]
        public int MembroId { get; set; }

        public Categoria Categoria { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Categoria!")]
        public int CategoriaId { get; set; }

        public Conta Conta { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Conta!")]
        public int ContaId { get; set; }

    }
}
