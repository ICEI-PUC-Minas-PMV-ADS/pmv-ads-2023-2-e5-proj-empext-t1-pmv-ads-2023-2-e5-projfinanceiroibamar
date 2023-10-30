using api_financeiro_ibamar.Models;
using Microsoft.EntityFrameworkCore;

namespace api_financeiro_ibamar.Context
{
    public class ApplicationDbContext:  DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Conta> Contas { get; set; }

        public DbSet<Categoria> Categorias { get; set; }

        public DbSet<Membro> Membros { get; set; }

        public DbSet<Fornecedor> Fornecedores { get; set; }

        public DbSet<Receita> Receitas { get; set; }

        public DbSet<Despesa> Despesas { get; set; }


    }
}
