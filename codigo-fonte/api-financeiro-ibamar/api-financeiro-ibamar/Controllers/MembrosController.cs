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
    public class MembrosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MembrosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Membros
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Membro>>> GetMembros()
        {
          if (_context.Membros == null)
          {
              return NotFound();
          }
            return await _context.Membros.ToListAsync();
        }

        // GET: api/Membros/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Membro>> GetMembro(int id)
        {
          if (_context.Membros == null)
          {
              return NotFound();
          }
            var membro = await _context.Membros.FindAsync(id);

            if (membro == null)
            {
                return NotFound();
            }

            return membro;
        }

        // PUT: api/Membros/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMembro(int id, Membro membro)
        {
            if (id != membro.Id)
            {
                return BadRequest();
            }

            _context.Entry(membro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MembroExists(id))
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

        // POST: api/Membros
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Membro>> PostMembro(Membro membro)
        {
          if (_context.Membros == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Membros'  is null.");
          }
            _context.Membros.Add(membro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMembro", new { id = membro.Id }, membro);
        }

        // DELETE: api/Membros/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMembro(int id)
        {
            if (_context.Membros == null)
            {
                return NotFound();
            }
            var membro = await _context.Membros.FindAsync(id);
            if (membro == null)
            {
                return NotFound();
            }

            _context.Membros.Remove(membro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MembroExists(int id)
        {
            return (_context.Membros?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
