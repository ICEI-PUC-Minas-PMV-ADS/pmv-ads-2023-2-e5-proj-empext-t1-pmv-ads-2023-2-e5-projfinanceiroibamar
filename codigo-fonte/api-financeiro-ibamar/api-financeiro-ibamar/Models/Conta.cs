using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api_financeiro_ibamar.Models
{
    [Table("contas")]
    public class Conta
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o descricao!")]
        public string Descricao { get; set; }

        [JsonIgnore]
        public double Saldo { get; set; }



        public Conta(string Descricao)
        {
            this.Descricao = Descricao;
            this.Saldo = 0;
        }

        public Conta()
        {
        }



    }
}
