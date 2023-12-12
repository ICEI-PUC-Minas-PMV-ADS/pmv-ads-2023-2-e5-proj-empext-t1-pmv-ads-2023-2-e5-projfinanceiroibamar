using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api_financeiro_ibamar.Context;
using api_financeiro_ibamar.Models;
using Microsoft.AspNetCore.Authorization;
using api_financeiro_ibamar.Services;
using FastReport.Export.PdfSimple;
using api_financeiro_ibamar.Models.Dto;
using api_financeiro_ibamar.Repository;

namespace api_financeiro_ibamar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReceitasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly AuthenticatedUser _authenticatedUser;

        public readonly IWebHostEnvironment _webHostEnv;

        public ReceitasController(ApplicationDbContext context,
                                  AuthenticatedUser authenticatedUser,
                                  IWebHostEnvironment webHostEnv)
        {
            _context = context;
            _authenticatedUser = authenticatedUser;
            _webHostEnv = webHostEnv;
        }

        // GET: api/Receitas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Receita>>> GetReceitas()
        {
          if (_context.Receitas == null)
          {
              return NotFound();
          }
            return await _context.Receitas
                .Include(m => m.Membro)
                .Include(cat => cat.Categoria)
                .Include(cont => cont.Conta)
                .Include(u => u.Usuario)
                .ToListAsync();
        }

        // GET: api/Receitas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Receita>> GetReceita(int id)
        {
          if (_context.Receitas == null)
          {
              return NotFound();
            }
            var receita = _context.Receitas
                .Include(m => m.Membro)
                .Include(cat => cat.Categoria)
                .Include(cont => cont.Conta)
                .Include(u => u.Usuario)
                .FirstOrDefault(r => r.Id == id);
                //.FindAsync(id);



            if (receita == null)
            {
                return NotFound();
            }

            return receita;
        }

        // PUT: api/Receitas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceita(int id, ReceitaDTO receitaDTO)
        {
            if (id != receitaDTO.Id)
            {
                return BadRequest();
            }

            var receita = _context.Receitas
                .FirstOrDefault(r => r.Id == id);

            receita.Descricao = receitaDTO.Descricao;
            receita.DataRecebimento = receitaDTO.DataRecebimento;
            receita.Valor = receitaDTO.Valor;
            receita.MembroId = receitaDTO.MembroId;
            receita.ContaId = receitaDTO.ContaId;
            receita.CategoriaId = receitaDTO.CategoriaId;
            receita.ContaId = receitaDTO.ContaId;



            _context.Entry(receita).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceitaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Receitas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Receita>> PostReceita(ReceitaDTO receitaDTO)
        {
          if (_context.Receitas == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Receitas'  is null.");
          }
            var receita = receitaDTO.receitaDtoToReceita();
            receita.DataLancamento = DateTime.UtcNow;
            receita.UsuarioId = Int32.Parse(this._authenticatedUser.Sid);
            _context.Receitas.Add(receita);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceita", new { id = receita.Id }, receita);
        }

        
        [HttpGet("criarRelatorioReceitas")]
        public async Task<IActionResult> CeateReport()
        {

            var slnPath = _webHostEnv.ContentRootPath;
            //var path = Path.Combine(slnPath, "api-financeiro-ibamar");
            var caminhoReport = Path.Combine(slnPath, @"reports\Receitas.frx");
            var reportFile = caminhoReport;
            var freport = new FastReport.Report();
            var receitaLista = _context.Receitas
                .Include(m => m.Membro)
                .Include(cat => cat.Categoria)
                .Include(cont => cont.Conta)
                .Include(u => u.Usuario)
                .ToList();

            freport.Dictionary.RegisterBusinessObject(receitaLista, "receitaLista", 10, true);
            freport.Report.Save(reportFile);

            Console.WriteLine($" Relatorio gerado : {caminhoReport}");

            return NoContent();
        }


        [HttpGet("gerarRelatorioReceitas")]
        public async Task<IActionResult> RunReport(DateTime dataInicio, DateTime dataFim, int membroId, int contaId, int categoriaId)
        {

            var slnPath = _webHostEnv.ContentRootPath;
            //var path = Path.Combine(slnPath, "api-financeiro-ibamar");
            var caminhoReport = Path.Combine(slnPath, @"reports\Receitas.frx");
            var reportFile = caminhoReport;
            var freport = new FastReport.Report();



            IQueryable<Receita> query = _context.Receitas
                .Include(m => m.Membro)
                .Include(cat => cat.Categoria)
                .Include(cont => cont.Conta)
                .Include(u => u.Usuario);

            if (dataInicio != DateTime.Parse("01/01/0001 00:00:00"))
            {
                query = query.Where(x => x.DataRecebimento >= dataInicio);
                Console.WriteLine("entrou1");
            }
            if (dataFim != DateTime.Parse("01/01/0001 00:00:00"))
            {
                query = query.Where(x => x.DataRecebimento <= dataFim);
                Console.WriteLine("entrou2");
            }
            if (membroId != 0)
            {
                query = query.Where(x => x.MembroId == membroId);
            }
            if (categoriaId != 0)
            {
                query = query.Where(x => x.CategoriaId == categoriaId);
            }
            if (contaId != 0)
            {
                query = query.Where(x => x.ContaId == contaId);
            }
            var receitaLista = query.ToList();


            freport.Report.Load(reportFile);
            freport.Dictionary.RegisterBusinessObject(receitaLista, "receitaLista", 10, true);
            //freport.Report.Save(reportFile);
            freport.Prepare();

            var pdfExport = new PDFSimpleExport();

            using MemoryStream ms = new MemoryStream();
            pdfExport.Export(freport, ms);
            ms.Flush();

            return File(ms.ToArray(), "application/pdf");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceita(int id)
        {
            if (_context.Receitas == null)
            {
                return NotFound();
            }
            var receita = await _context.Receitas.FindAsync(id);
            if (receita == null)
            {
                return NotFound();
            }

            _context.Receitas.Remove(receita);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReceitaExists(int id)
        {
            return (_context.Receitas?.Any(e => e.Id == id)).GetValueOrDefault();
        }       
    }
}
