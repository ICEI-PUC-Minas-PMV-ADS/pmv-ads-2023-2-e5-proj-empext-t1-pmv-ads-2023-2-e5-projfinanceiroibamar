using System.ComponentModel.DataAnnotations;

namespace api_financeiro_ibamar.Models.Dto
{
    public class ReceitaDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a descricao!")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Valor!")]
        public double Valor { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Data de Vencimento!")]
        public DateTime DataRecebimento { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o Membro!")]
        public int MembroId { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Categoria!")]
        public int CategoriaId { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Conta!")]
        public int ContaId { get; set; }


        public Receita receitaDtoToReceita()
        {
            var receita = new Receita();
            receita.Descricao = this.Descricao;
            receita.Valor = this.Valor;
            receita.DataRecebimento = this.DataRecebimento;
            receita.MembroId = this.MembroId;
            receita.CategoriaId = this.CategoriaId;
            receita.ContaId = this.ContaId;

            return receita;
        }
    }
}
