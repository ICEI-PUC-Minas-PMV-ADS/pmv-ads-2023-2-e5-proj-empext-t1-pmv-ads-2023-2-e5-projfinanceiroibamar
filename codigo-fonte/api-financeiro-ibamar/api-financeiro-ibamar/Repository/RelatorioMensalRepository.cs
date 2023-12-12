using api_financeiro_ibamar.Models.Dto;
using Microsoft.EntityFrameworkCore;

namespace api_financeiro_ibamar.Repository
{
    public class RelatorioMensalRepository : QueryRepository
    {
        public RelatorioMensalRepository(DbContext context) : base(context)
        {
            
        }

        public IList<RelatorioMensalDTO>  relarioMensal()
        {
            var xsql= "select rel.tipo, rel.conta,rel.categoria, sum(rel.valor) total\n"
                        + "from(\n"
                        + "SELECT 'D' tipo, con.Descricao  conta,\n"
                        +"       cat.Descricao categoria,\n"
                        +"       d.Valor\n"
                        +"FROM master.dbo.Despesas d\n"
                        +"INNER JOIN master.dbo.categorias cat ON cat.Id = d.CategoriaId\n"
                        +"INNER JOIN master.dbo.contas con  ON con.Id = d.ContaId\n"
                        +"union all\n"
                        +"SELECT 'R' tipo, con.Descricao  conta,\n"
                        +"       cat.Descricao categoria,\n"
                        +"       r.Valor\n"
                        +"FROM master.dbo.Receitas r\n"
                        +"INNER JOIN master.dbo.categorias cat ON cat.Id = r.CategoriaId\n"
                        +"INNER JOIN master.dbo.contas con  ON con.Id = r.ContaId\n"
                        +") rel\n"
                        +"group by rel.tipo, rel.conta,rel.categoria\n"
                        +"order by rel.tipo DESC, rel.conta desc, rel.categoria\n";

            
            return this.SelectSql<RelatorioMensalDTO>(xsql); 
        }

        public IList<DespesaContaCategoriaDTO> despesaContaCategoria(String mes, String ano)
        {
            var xsql = "SELECT 'Despesas' tipo, con.Descricao  conta,\n"
                        + "cat.Descricao categoria,\n"
                        + "sum(d.Valor) total\n"
                        + "FROM master.dbo.Despesas d\n"
                        + "INNER JOIN master.dbo.categorias cat ON cat.Id = d.CategoriaId\n"
                        + "INNER JOIN master.dbo.contas con  ON con.Id = d.ContaId\n"
                        + "where FORMAT(d.DataPagamento ,'yyyy-MM') = '" + ano + "-"+mes+"'"
                        + "GROUP BY con.Descricao, cat.Descricao\n"
                        + "order by con.Descricao desc, cat.Descricao";


            return this.SelectSql<DespesaContaCategoriaDTO>(xsql);
        }

        public IList<DespesaContaCategoriaDetealheDTO> despesaContaCategoriaDetealhe(String mes, String ano)
        {
            var xsql = "SELECT 'Despesas' tipo, con.Descricao  conta,\n"
                        + "cat.Descricao categoria,\n"
                        + "d.Descricao,\n"
                        + "d.DataPagamento,\n"
                        + "d.Valor total\n"
                        + "FROM master.dbo.Despesas d\n"
                        + "INNER JOIN master.dbo.categorias cat ON cat.Id = d.CategoriaId\n"
                        + "INNER JOIN master.dbo.contas con  ON con.Id = d.ContaId\n"
                        + "where FORMAT(d.DataPagamento ,'yyyy-MM') = '" + ano + "-" + mes + "'"
                        + "order by con.Descricao desc, cat.Descricao,d.DataPagamento";


            return this.SelectSql<DespesaContaCategoriaDetealheDTO>(xsql);
        }

        public IList<ReceitaContaCategoriaDTO> receitaContaCategoria(String mes, String ano)
        {
            var xsql = "SELECT 'Receitas' tipo, con.Descricao conta,\n"
                       + "cat.Descricao categoria,\n"
                       + "sum(r.Valor) total\n"
                       + "FROM master.dbo.Receitas r\n"
                       + "INNER JOIN master.dbo.categorias cat ON cat.Id = r.CategoriaId\n"
                       + "INNER JOIN master.dbo.contas con  ON con.Id = r.ContaId\n"
                       + "where FORMAT(r.DataRecebimento ,'yyyy-MM') = '" + ano + "-" + mes + "'"
                       + "GROUP BY con.Descricao, cat.Descricao\n"
                       + "order by con.Descricao desc, cat.Descricao";


            return this.SelectSql<ReceitaContaCategoriaDTO>(xsql);
        }
    }
}
