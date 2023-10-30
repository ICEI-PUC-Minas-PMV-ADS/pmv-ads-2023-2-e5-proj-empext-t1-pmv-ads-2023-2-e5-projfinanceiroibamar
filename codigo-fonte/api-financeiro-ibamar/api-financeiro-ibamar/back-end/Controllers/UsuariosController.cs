using api_financeiro_ibamar.Models.Dto;
using api_financeiro_ibamar.Context;
using api_financeiro_ibamar.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using api_financeiro_ibamar.Services;

namespace api_financeiro_ibamar.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsuariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("login")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UsuarioDTO>> Login([Bind("Login,Senha")] UsuarioLogin usuario)
        {
            if (usuario == null)
            {
                return BadRequest();
            }

            if (_context.Usuarios == null)
            {
                return Unauthorized();
            }


            var usuarioLogado = await _context.Usuarios.FirstOrDefaultAsync(u => u.Login == usuario.Login);

            if (usuarioLogado == null || !BCrypt.Net.BCrypt.Verify(usuario.Senha, usuarioLogado.Senha))
            {
                System.Diagnostics.Debug.WriteLine(" nao bateu");
                return Unauthorized();
            }
            System.Diagnostics.Debug.WriteLine(" bateu");

            var token = TokenService.GenerateToken(usuarioLogado);

            return new UsuarioDTO(usuarioLogado.Id, usuarioLogado.Nome, usuarioLogado.Login, token, usuarioLogado.Role);

        }


        [HttpPost]
        public async Task<ActionResult<UsuarioDTO>> Cadastrar(UsuarioCadastroDTO usuarioDTO
            )
        {
            if (usuarioDTO == null)
            {
                return BadRequest();
            }

            if (_context.Usuarios == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Usuarios'  is null.");
            }

            if ((usuarioDTO.Role != "Admin") && (usuarioDTO.Role != "Pastor") && (usuarioDTO.Role != "Tesoureiro"))
            {
                return Problem("Tipo de usario descocnhecido.");
            }

            //ValidaUsuario
            var usuarioCadastro = await _context.Usuarios.FirstOrDefaultAsync(u => u.Login == usuarioDTO.Login);

            if (!(usuarioCadastro == null))
            {
                return new UsuarioDTO(usuarioCadastro.Id, usuarioCadastro.Nome, usuarioCadastro.Login, usuarioCadastro.Role, null);
            }

            usuarioCadastro = new Usuario(usuarioDTO.Nome, usuarioDTO.Login, BCrypt.Net.BCrypt.HashPassword(usuarioDTO.Senha), usuarioDTO.Role, "S");
            _context.Usuarios.Add(usuarioCadastro);



            Console.WriteLine("salvou cliente");
            Console.WriteLine(usuarioDTO.Role);


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                {
                    throw;
                }
            }


            return new UsuarioDTO(usuarioCadastro.Id, usuarioCadastro.Nome, usuarioCadastro.Login, usuarioCadastro.Role, null);


        }


        [Route("validaUsername")]
        [HttpGet]
        public async Task<ActionResult<String>> validaUsername([Bind("login")] String login)
        {
            if (login == null)
            {
                return BadRequest();
            }

            if (_context.Usuarios == null)
            {
                return Unauthorized();
            }


            var usuarioLogado = await _context.Usuarios.FirstOrDefaultAsync(u => u.Login == login);

            if (usuarioLogado == null)
            {
                return "OK";
            }

            return "Usuario já cadastrado";

        }

        [Route("alterarSenha")]
        [HttpPut]
        public async Task<ActionResult<String>> alteraSenha(UsuarioAlterarSenhaDTO usuarioSenha)
        {
            if (usuarioSenha == null)
            {
                return BadRequest();
            }

            if (_context.Usuarios == null)
            {
                return Unauthorized();
            }


            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Login == usuarioSenha.Login);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(usuarioSenha.AntigaSenha, usuario.Senha))
            {
                System.Diagnostics.Debug.WriteLine(" nao bateu");
                return Unauthorized();
            }

            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuarioSenha.NovaSenha);

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(usuario.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return "Senha alterada com sucesso!";

        }

        private string gerarSenha()
        {
            string validar = "abcdefghijklmnozABCDEFGHIJKLMNOZ1234567890@#$%&*!";
            string _senha = "";
            try
            {
                int _tamanho_senha = 8;
                StringBuilder strbld = new StringBuilder(100);
                Random random = new Random();
                while (0 < _tamanho_senha--)
                {
                    strbld.Append(validar[random.Next(validar.Length)]);
                }
                _senha = strbld.ToString();
            }
            catch (Exception ex)
            {
                _senha = "error";
            }
            return _senha;
        }


        private bool UsuarioExists(int id)
        {
            return (_context.Usuarios?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }
            return await _context.Usuarios.ToListAsync();
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

    }

    public class UsuarioLogin
    {
        public string Login { get; set; }

        public string Senha { get; set; }

        public Usuario usuarioDtoToUsuario()
        {
            var usuario = new Usuario();
            usuario.Login = Login;
            usuario.Senha = Senha;
            return usuario;
        }
    }

    public class UsuarioCadastroDTO
    {
        public string Login { get; set; }

        public string Senha { get; set; }

        public string Nome { get; set; }


        public string Role { get; set; }



    }

    public class UsuarioAlterarSenhaDTO
    {
        public string Login { get; set; }

        public string AntigaSenha { get; set; }

        public string NovaSenha { get; set; }



        public Usuario usuarioAlterarSenhaDTO()
        {
            var usuario = new Usuario();
            usuario.Login = Login;
            usuario.Senha = NovaSenha;
            return usuario;
        }
    }
}
