using Microsoft.AspNetCore.Mvc;
using api_financeiro_ibamar.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Reflection;
using api_financeiro_ibamar.Repository;
using FastReport.Export.PdfSimple;

namespace api_financeiro_ibamar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RelatorioMensalController : ControllerBase
    {
        private readonly ApplicationDbContext _context; 
        
        public readonly IWebHostEnvironment _webHostEnv;

        public readonly RelatorioMensalRepository _relatorioMensalRepository;

        public RelatorioMensalController(ApplicationDbContext context,
                                  IWebHostEnvironment webHostEnv)
        {
            _context = context;
            _webHostEnv = webHostEnv;
            _relatorioMensalRepository = new RelatorioMensalRepository(context);
        }

        [HttpGet("criarRelatorioMensal")]
        public async Task<IActionResult> CeateReport()
        {

            var slnPath = _webHostEnv.ContentRootPath;
            //var path = Path.Combine(slnPath, "api-financeiro-ibamar");
            var caminhoReport = Path.Combine(slnPath, @"reports\RelatorioMensal.frx");
            var reportFile = caminhoReport;
            var freport = new FastReport.Report();
            var despesaContaCategoria = _relatorioMensalRepository.despesaContaCategoria("12","2023");
            var despesaContaCategoriaDetalhe = _relatorioMensalRepository.despesaContaCategoriaDetealhe("12", "2023");
            var receitaContaCategoria = _relatorioMensalRepository.receitaContaCategoria("12", "2023");


            freport.Dictionary.RegisterBusinessObject(despesaContaCategoria, "despesaContaCategoria", 10, true);
            freport.Dictionary.RegisterBusinessObject(despesaContaCategoriaDetalhe, "despesaContaCategoriaDetalhe", 10, true);
            freport.Dictionary.RegisterBusinessObject(receitaContaCategoria, "receitaContaCategoria", 10, true);
            freport.Report.Save(reportFile);

            Console.WriteLine($" Relatorio gerado : {caminhoReport}");

            return NoContent();
        }

        [HttpGet("gerarRelatorioMensal")]
        [AllowAnonymous]
        public async Task<IActionResult> RunReport(String mes, String ano)
        {

            var slnPath = _webHostEnv.ContentRootPath;
            //var path = Path.Combine(slnPath, "api-financeiro-ibamar");
            var caminhoReport = Path.Combine(slnPath, @"reports\RelatorioMensal.frx");
            var reportFile = caminhoReport;
            var freport = new FastReport.Report();

            var despesaContaCategoria = _relatorioMensalRepository.despesaContaCategoria(mes,ano);
            var despesaContaCategoriaDetalhe = _relatorioMensalRepository.despesaContaCategoriaDetealhe(mes, ano);
            var receitaContaCategoria = _relatorioMensalRepository.receitaContaCategoria(mes, ano);


            freport.Report.Load(reportFile);
            freport.Dictionary.RegisterBusinessObject(despesaContaCategoria, "despesaContaCategoria", 10, true);
            freport.Dictionary.RegisterBusinessObject(despesaContaCategoriaDetalhe, "despesaContaCategoriaDetalhe", 10, true);
            freport.Dictionary.RegisterBusinessObject(receitaContaCategoria, "receitaContaCategoria", 10, true);
            //freport.Report.Save(reportFile);
            freport.Prepare();

            var pdfExport = new PDFSimpleExport();

            using MemoryStream ms = new MemoryStream();
            pdfExport.Export(freport, ms);
            ms.Flush();

            return File(ms.ToArray(), "application/pdf");
        }


    }
}
