using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api_financeiro_ibamar.Models
{
    [Table("usuarios")]
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar o nome!")]
        public string Nome { get; set; }

        [Display(Name = "login")]
        [Required(ErrorMessage = "Obrigatório Informar o login!")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a senha!")]
        [JsonIgnore]
        public string Senha { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a senha!")]
        public string Role { get; set; }

        public string Ativo { get; set; }

        

        public Usuario(string Nome, string Login,String Senha, String Role)
        {
            this.Senha = Senha;
            this.Nome = Nome;
            this.Login = Login;
            this.Role = Role;
        }

        public Usuario()
        {
        }



    }

}
