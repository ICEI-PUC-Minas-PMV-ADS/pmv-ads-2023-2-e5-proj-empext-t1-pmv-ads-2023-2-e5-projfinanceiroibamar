using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api_financeiro_ibamar.Models
{
    [Table("Fornecedores")]
    public class Fornecedor
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o CPF!")]
        public string cpf_cnpj { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o tipo de Pessoa!")]
        public string TipoPessoa { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Razão Social!")]
        public string RazaoSocial { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Nome Fantasia!")]
        public string NomeFantasia { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o logradouro!")]
        public string Logradouro { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o bairro!")]
        public string Bairro { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o numero!")]
        public string Numero { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Cidade!")]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a UF!")]
        public string UF { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o CEP!")]
        public string CEP { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o telefone!")]
        public string Telefone { get; set; }

    }
}
