using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Reflection;

namespace api_financeiro_ibamar.Repository
{
    public abstract class QueryRepository
    {
        protected readonly DbContext _context;
        protected QueryRepository(DbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Faz o select em seu banco de dados usando o LINQ do Entity Framework (EF)
        /// </summary>
        /// <typeparam name="TEntity">Sua classe de entidade</typeparam>
        protected IEnumerable<TEntity> SelectLinq<TEntity>(Func<TEntity, bool> predicate) where TEntity : class
        {
            return _context.Set<TEntity>().Where(predicate);
        }

        /// <summary>
        /// Faz o select em seu banco de dados
        /// </summary>
        /// <typeparam name="Tdto"></typeparam>
        protected IList<Tdto> SelectSql<Tdto>(string sql, params object[] parameters) where Tdto : class
        {
            using var command = _context.Database.GetDbConnection().CreateCommand();
            command.CommandText = sql;

            foreach (var parameter in parameters)
            {
                command.Parameters.Add(parameter);
            }

            _context.Database.OpenConnection();
            using var result = command.ExecuteReader();
            return DataReaderMapToList<Tdto>(result);
        }

        /// <summary>
        /// Executa queries de retorno unico. Ex select count from table
        /// </summary>
        protected object ExecuteScalar(string sql, params object[] parameters)
        {
            using var command = _context.Database.GetDbConnection().CreateCommand();
            command.CommandText = sql;

            foreach (var parameter in parameters)
            {
                command.Parameters.Add(parameter);
            }

            _context.Database.OpenConnection();
            var result = command.ExecuteScalar();
            return result;
        }

        private static List<Tdto> DataReaderMapToList<Tdto>(DbDataReader dr)
        {
            List<Tdto> list = new List<Tdto>();

            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    var dto = Activator.CreateInstance<Tdto>();
                    foreach (PropertyInfo prop in dto.GetType().GetProperties())
                    {
                        if (dr.GetColumnSchema().Any(x => x.ColumnName.ToUpper() == prop.Name.ToUpper()))
                        {
                            if (!Equals(dr[prop.Name], DBNull.Value))
                            {
                                prop.SetValue(dto, dr[prop.Name], null);
                            }
                        }
                    }
                    list.Add(dto);
                }
                return list;
            }
            return new List<Tdto>();
        }
    }
}
