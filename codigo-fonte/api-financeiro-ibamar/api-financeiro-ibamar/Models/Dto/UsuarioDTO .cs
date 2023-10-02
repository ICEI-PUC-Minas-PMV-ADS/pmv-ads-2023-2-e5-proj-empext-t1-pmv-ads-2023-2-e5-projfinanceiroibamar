using api_financeiro_ibamar.Models;

namespace api_financeiro_ibamar.Models.Dto
{
    public class UsuarioDTO
    {

        public int Id { get; set; }

        public string Nome { get; set; }

        public string Login { get; set; }

        public string Token { get; set; }

        public string Role { get; set; }

        public UsuarioDTO(int id, string nome, string login, string token, string role)
        {
            this.Id = id;
            this.Nome = nome;
            this.Login = login;
            this.Token = token;
            this.Role = role;
        }

        public UsuarioDTO()
        {
        }

        public Usuario usuarioDtoToUsuario()
        {
            var usuario = new Usuario();
            usuario.Login = Login;
            usuario.Nome = Nome;
            usuario.Id = Id;

            return usuario;
        }
    }

}
