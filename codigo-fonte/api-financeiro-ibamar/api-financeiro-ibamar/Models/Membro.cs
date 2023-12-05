using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_financeiro_ibamar.Models
{

    [Table("Membros")]
    public class Membro
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o CPF!")]
        public string cpf { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Nome!")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o sexo!")]
        public string Sexo { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Data de Nascimento!")]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o telefone!")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o telefone!")]
        public string Celular { get; set; }
        

        [Required(ErrorMessage = "Obrigatório Informar o CEP!")]
        public string CEP { get; set; } 

        //[Required(ErrorMessage = "Obrigatório Informar o logradouro!")]
        public string Logradouro { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o numero!")]
        public string Numero { get; set; }

        public string Complemento { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o bairro!")]
        public string Bairro { get; set; }        

        [Required(ErrorMessage = "Obrigatório Informar a Cidade!")]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a UF!")]
        public string UF { get; set; }

    }
}
