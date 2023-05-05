using ContactBook.Data;
using ContactBook.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactBook.Controllers;

public class ContactController : BaseApiController
{
    private readonly StoreContext _context;

    public ContactController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Contact>>> GetContacts()
    {
        return await _context.Contacts.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Contact>> GetContact(Guid id)
    {
        return await _context.Contacts.FindAsync(id);
    }
    
    [HttpPost]
    public async Task<ActionResult<Contact>> CreateContact(Contact contact)
    {
        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateContact(Guid id, Contact contact)
    {
        if (id != contact.Id)
        {
            return BadRequest();
        }
        
        _context.Entry(contact).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContact(Guid id)
    {
        var contact = await _context.Contacts.FindAsync(id);
        if (contact == null)
        {
            return NotFound();
        }

        _context.Contacts.Remove(contact);
        await _context.SaveChangesAsync();

        return NoContent();
    }

}
