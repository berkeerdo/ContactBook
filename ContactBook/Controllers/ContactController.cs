using ContactBook.Data;
using ContactBook.Entities;
using ContactBook.Extensions;
using ContactBook.RequestHelpers;
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
    public async Task<ActionResult<PagedList<Contact>>> GetContacts(
    [FromQuery] ContactParams contactParams)
    {
        var query = _context.Contacts.AsQueryable();

        query = query.Sort(contactParams.OrderBy)
        .Search(contactParams.SearchTerm);

        var contacts = await PagedList<Contact>
        .ToPagedList(query, contactParams.PageNumber, contactParams.PageSize);

        Response.AddPaginationHeader(contacts.MetaData);

        return contacts;
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
