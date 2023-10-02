using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_financeiro_ibamar.Models
{
    [Table("contas")]
    public class Conta
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o descricao!")]
        public string Descricao { get; set; }



        public Conta(string Descricao)
        {
            this.Descricao = Descricao;
        }

        public Conta()
        {
        }



    }
}
