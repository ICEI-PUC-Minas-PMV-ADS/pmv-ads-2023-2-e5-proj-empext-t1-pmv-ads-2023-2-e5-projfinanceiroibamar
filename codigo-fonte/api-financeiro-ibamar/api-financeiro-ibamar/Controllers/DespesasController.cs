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

namespace api_financeiro_ibamar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DespesasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DespesasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Despesas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Despesa>>> GetDespesas()
        {
          if (_context.Despesas == null)
          {
              return NotFound();
          }
            return await _context.Despesas.ToListAsync();
        }

        // GET: api/Despesas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Despesa>> GetDespesa(int id)
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

            return despesa;
        }

        // PUT: api/Despesas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDespesa(int id, Despesa despesa)
        {
            if (id != despesa.Id)
            {
                return BadRequest();
            }

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
        public async Task<ActionResult<Despesa>> PostDespesa(Despesa despesa)
        {
          if (_context.Despesas == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Despesas'  is null.");
          }
            _context.Despesas.Add(despesa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDespesa", new { id = despesa.Id }, despesa);
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
