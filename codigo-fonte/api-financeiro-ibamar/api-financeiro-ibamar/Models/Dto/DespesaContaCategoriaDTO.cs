namespace api_financeiro_ibamar.Models.Dto
{
    public class DespesaContaCategoriaDTO
    {
        public string Tipo { get; set; }

        public string Conta { get; set; }

        public string Categoria { get; set; }

        public string Descricao { get; set; }

        public DateTime DataPagamento { get; set; }

        public double Total { get; set; }
    }
}
