using api_financeiro_ibamar.Context;
using api_financeiro_ibamar.Models;
using api_financeiro_ibamar.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api_financeiro_ibamar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ContasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public ContasController(ApplicationDbContext context)
        {
            _context = context;
            
        }

        // GET: api/Contas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Conta>>> GetContas()
        {
            if (_context.Contas == null)
            {
                return NotFound();
            }

            return await _context.Contas
                .ToListAsync();
        }

        // GET: api/Contas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Conta>> GetConta(int id)
        {
            if (_context.Contas == null)
            {
                return NotFound();
            }
            var Conta = await _context.Contas.FindAsync(id);

            if (Conta == null)
            {
                return NotFound();
            }

            return Conta;
        }

        // PUT: api/Contas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConta(int id, Conta Conta)
        {
            if (id != Conta.Id)
            {
                return BadRequest();
            }

            _context.Entry(Conta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContaExists(id))
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

        // POST: api/Contas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Conta>> PostConta(Conta Conta)
        {
            if (_context.Contas == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Contas'  is null.");
            }
            _context.Contas.Add(Conta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConta", new { id = Conta.Id }, Conta);
        }

        // DELETE: api/Contas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConta(int id)
        {
            if (_context.Contas == null)
            {
                return NotFound();
            }
            var Conta = await _context.Contas.FindAsync(id);
            if (Conta == null)
            {
                return NotFound();
            }

            _context.Contas.Remove(Conta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContaExists(int id)
        {
            return (_context.Contas?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
