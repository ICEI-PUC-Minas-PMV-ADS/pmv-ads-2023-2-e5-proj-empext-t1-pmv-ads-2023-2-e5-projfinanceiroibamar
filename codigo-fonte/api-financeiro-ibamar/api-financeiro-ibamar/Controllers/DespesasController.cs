using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api_financeiro_ibamar.Context;
using api_financeiro_ibamar.Models;
using Microsoft.AspNetCore.Authorization;
using api_financeiro_ibamar.Models.Dto;
using api_financeiro_ibamar.Services;
using FastReport.Export.PdfSimple;

namespace api_financeiro_ibamar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DespesasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly AuthenticatedUser _authenticatedUser;

        public readonly IWebHostEnvironment _webHostEnv;

        public DespesasController(ApplicationDbContext context,
                                  AuthenticatedUser authenticatedUser,
                                  IWebHostEnvironment webHostEnv)
        {
            _context = context;
            _authenticatedUser = authenticatedUser;
            _webHostEnv = webHostEnv;
        }

        // GET: api/Despesas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Despesa>>> GetDespesas()
        {
          if (_context.Despesas == null)
          {
              return NotFound();
          }
            return await _context.Despesas
                .Include(f => f.Fornecedor)
                .Include(cat => cat.Categoria)
                .Include(cont => cont.Conta)
                .Include(u => u.Usuario)
                .ToListAsync();
        }

        // GET: api/Despesas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Despesa>> GetDespesa(int id)
        {
          if (_context.Despesas == null)
          {
              return NotFound();
          }
            var despesa = _context.Despesas
                .Include(f => f.Fornecedor)
                .Include(cat => cat.Categoria)
                .Include(cont => cont.Conta)
                .Include(u => u.Usuario)
                .FirstOrDefault(r => r.Id == id);
            //.FindAsync(id);

            if (despesa == null)
            {
                return NotFound();
            }

            return despesa;
        }

        // PUT: api/Despesas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDespesa(int id, DespesaDTO despesaDTO)
        {
            if (id != despesaDTO.Id)
            {
                return BadRequest();
            }

            var despesa = _context.Despesas
                .FirstOrDefault(d => d.Id == id);

            despesa.Descricao = despesaDTO.Descricao;
            despesa.DataVencimento = despesaDTO.DataVencimento;
            despesa.DataPagamento = despesaDTO.DataPagamento;
            despesa.Valor = despesaDTO.Valor;
            despesa.FornecedorId = despesaDTO.FornecedorId;
            despesa.ContaId = despesaDTO.ContaId;
            despesa.CategoriaId = despesaDTO.CategoriaId;
            despesa.ContaId = despesaDTO.ContaId;

            _context.Entry(despesa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DespesaExists(id))
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

        // POST: api/Despesas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Despesa>> PostDespesa(DespesaDTO despesaDTO)
        {
          if (_context.Despesas == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Despesas'  is null.");
          }
            var despesa = despesaDTO.despesaDtoToDespesa();
            despesa.DataLancamento = DateTime.UtcNow;
            despesa.UsuarioId = Int32.Parse(this._authenticatedUser.Sid);
            _context.Despesas.Add(despesa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDespesa", new { id = despesa.Id }, despesa);
        }

        [HttpGet("criarRelatorioDespesas")]
        public async Task<IActionResult> CreateReport()
        {

            //1.get the solution path...  e.g.C:\repos\SolutionName
            var slnPath = Directory.GetParent(System.IO.Directory.GetCurrentDirectory()).ToString();
            //2.get the Web api project path... e.g.  C:\repost\SolutionName\ProjectName\wwwroot\
            var path = Path.Combine(slnPath, "api-financeiro-ibamar");
            Console.WriteLine("path");
            Console.WriteLine(path);
            Console.WriteLine("_webHostEnv");
            Console.WriteLine(_webHostEnv.WebRootPath);
            var caminhoReport = Path.Combine(path, @"reports\Despesas.frx");
            var reportFile = caminhoReport;
            var freport = new FastReport.Report();
            var despesaLista = _context.Despesas
                .Include(f => f.Fornecedor)
                .Include(cat => cat.Categoria)
                .Include(cont => cont.Conta)
                .Include(u => u.Usuario)
                .ToList();

            freport.Dictionary.RegisterBusinessObject(despesaLista, "despesaLista", 10, true);
            freport.Report.Save(reportFile);

            Console.WriteLine($" Relatorio gerado : {caminhoReport}");

            return NoContent();
        }

        [HttpGet("gerarRelatorioDespesas")]
        public async Task<IActionResult> RunReport(DateTime dataInicio, DateTime dataFim, int fornecedorId, int contaId, int categoriaId)
        {

            var slnPath = _webHostEnv.ContentRootPath;
            //var path = Path.Combine(slnPath, "api-financeiro-ibamar");
            var caminhoReport = Path.Combine(slnPath, @"reports\Despesas.frx");
            var reportFile = caminhoReport;
            var freport = new FastReport.Report();

            IQueryable<Despesa> query = _context.Despesas
                .Include(f => f.Fornecedor)
                .Include(cat => cat.Categoria)
                .Include(cont => cont.Conta)
                .Include(u => u.Usuario);

            if (dataInicio != DateTime.Parse("01/01/0001 00:00:00"))
            {
                query = query.Where(x => x.DataPagamento >= dataInicio);
                Console.WriteLine("entrou1");
            }
            if (dataFim != DateTime.Parse("01/01/0001 00:00:00"))
            {
                query = query.Where(x => x.DataPagamento <= dataFim);
                Console.WriteLine("entrou2");
            }
            if (fornecedorId != 0)
            {
                query = query.Where(x => x.FornecedorId == fornecedorId);
            }
            if (categoriaId != 0)
            {
                query = query.Where(x => x.CategoriaId == categoriaId);
            }
            if (contaId != 0)
            {
                query = query.Where(x => x.ContaId == contaId);
            }
            var despesaLista = query.ToList();

            freport.Report.Load(reportFile);
            freport.Dictionary.RegisterBusinessObject(despesaLista, "despesaLista", 10, true);
            //freport.Report.Save(reportFile);
            freport.Prepare();

            var pdfExport = new PDFSimpleExport();

            using MemoryStream ms = new MemoryStream();
            pdfExport.Export(freport, ms);
            ms.Flush();

            return File(ms.ToArray(), "application/pdf");
        }

        // DELETE: api/Despesas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDespesa(int id)
        {
            if (_context.Despesas == null)
            {
                return NotFound();
            }
            var despesa = await _context.Despesas.FindAsync(id);
            if (despesa == null)
            {
                return NotFound();
            }

            _context.Despesas.Remove(despesa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DespesaExists(int id)
        {
            return (_context.Despesas?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
