using ContactBook.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactBook.Data;

public class StoreContext : DbContext
{
    public StoreContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Contact> Contacts { get; set; }

}
