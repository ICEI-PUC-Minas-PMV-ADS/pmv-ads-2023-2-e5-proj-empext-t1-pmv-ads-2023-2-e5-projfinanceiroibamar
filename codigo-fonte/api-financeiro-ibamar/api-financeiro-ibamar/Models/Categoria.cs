using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_financeiro_ibamar.Models
{
    [Table("categorias")]
    public class Categoria
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o descricao!")]
        public string Descricao { get; set; }



        public Categoria(string Descricao)
        {
            this.Descricao = Descricao;
        }

        public Categoria()
        {
        }



    }

}
