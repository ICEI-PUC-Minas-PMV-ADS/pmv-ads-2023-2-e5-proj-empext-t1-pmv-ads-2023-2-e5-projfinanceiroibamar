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
    public class ReceitasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReceitasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Receitas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Receita>>> GetReceitas()
        {
          if (_context.Receitas == null)
          {
              return NotFound();
          }
            return await _context.Receitas.ToListAsync();
        }

        // GET: api/Receitas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Receita>> GetReceita(int id)
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

            return receita;
        }

        // PUT: api/Receitas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceita(int id, Receita receita)
        {
            if (id != receita.Id)
            {
                return BadRequest();
            }

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
        public async Task<ActionResult<Receita>> PostReceita(Receita receita)
        {
          if (_context.Receitas == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Receitas'  is null.");
          }
            _context.Receitas.Add(receita);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceita", new { id = receita.Id }, receita);
        }

        // DELETE: api/Receitas/5
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
