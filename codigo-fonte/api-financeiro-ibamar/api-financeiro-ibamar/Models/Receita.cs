using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        public double Valor { get; set; }

        public DateTime DataLancamento { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Data de Vencimento!")]
        public DateTime DataRecebimento { get; set; }

        
        public Usuario Usuario { get; set; }

        [JsonIgnore]
        public int UsuarioId { get; set; }

        public Membro Membro { get; set; }

        [JsonIgnore]
        public int MembroId { get; set; }
        
        public Categoria Categoria { get; set; }

        [JsonIgnore]
        public int CategoriaId { get; set; }

        public Conta Conta { get; set; }

        [JsonIgnore]
        public int ContaId { get; set; }

    }
}
