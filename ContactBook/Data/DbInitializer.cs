using ContactBook.Entities;

namespace ContactBook.Data;

public class DbInitializer
{
    public static void Initialize(StoreContext context)
    {
        if (context.Contacts.Any()) return;

        var contacts = new List<Contact>
        {
            new Contact()
            {
                FirstName = "Alice",
                MiddleName = "Jane",
                LastName = "Doe",
                Gender = "Female",
                Email = "alice.doe@gmail.com",
                PhoneNumber = "1234567890",
                HomePhone = "0987654321",
                WorkPhone = "1111111111",
                City = "New York",
                Address = "123 Main St.",
                WorkAddress = "456 Business Ave.",
                Instagram = "alice.doe",
                Facebook = "alice.doe",
                Twitter = "alice_doe",
                SnapChat = "alice_d",
                BirthDay = new DateTime(1990, 6, 1)
            },
            new Contact()
            {
                FirstName = "Bob",
                MiddleName = "Lee",
                LastName = "Smith",
                Gender = "Male",
                Email = "bob.smith@gmail.com",
                PhoneNumber = "2345678901",
                HomePhone = "9876543210",
                WorkPhone = "2222222222",
                City = "Los Angeles",
                Address = "456 Main St.",
                WorkAddress = "789 Business Ave.",
                Instagram = "bobsmith",
                Facebook = "bob.smith",
                Twitter = "bob_smith",
                SnapChat = "bob_s",
                BirthDay = new DateTime(1985, 9, 12)
            },
            new Contact()
            {
                FirstName = "Charlie",
                MiddleName = null,
                LastName = "Johnson",
                Gender = "Male",
                Email = "charlie.johnson@gmail.com",
                PhoneNumber = "3456789012",
                HomePhone = null,
                WorkPhone = "3333333333",
                City = "Chicago",
                Address = "789 Main St.",
                WorkAddress = "101 Business Ave.",
                Instagram = "charlie.j",
                Facebook = "charlie.johnson",
                Twitter = null,
                SnapChat = null,
                BirthDay = new DateTime(1993, 2, 28)
            },
            new Contact()
            {
                FirstName = "David",
                MiddleName = null,
                LastName = "Williams",
                Gender = "Male",
                Email = null,
                PhoneNumber = "4567890123",
                HomePhone = null,
                WorkPhone = "4444444444",
                City = "Houston",
                Address = "101 Main St.",
                WorkAddress = "111 Business Ave.",
                Instagram = "david.w",
                Facebook = null,
                Twitter = null,
                SnapChat = "david_w",
                BirthDay = new DateTime(1982, 10, 7)
            },
            new Contact
            {
                FirstName = "Brenda",
                LastName = "Flores",
                Gender = "Female",
                Email = "brendaflores@mail.com",
                PhoneNumber = "+1-202-555-0199",
                City = "New York",
                Address = "123 Main St",
                Instagram = "@brendaflores",
                Facebook = "brendaflores",
                BirthDay = new DateTime(1990, 5, 23)
            },
            new Contact
            {
                FirstName = "Nicholas",
                LastName = "Garcia",
                Gender = "Male",
                Email = "nicholasgarcia@mail.com",
                PhoneNumber = "+1-202-555-0120",
                City = "Los Angeles",
                Address = "456 Second St",
                Instagram = "@nicholasgarcia",
                Facebook = "nicholasgarcia",
                BirthDay = new DateTime(1985, 12, 15)
            },
            new Contact
            {
                FirstName = "Lauren",
                LastName = "Collins",
                Gender = "Female",
                Email = "laurencollins@mail.com",
                PhoneNumber = "+1-202-555-0121",
                City = "San Francisco",
                Address = "789 Third St",
                Instagram = "@laurencollins",
                Facebook = "laurencollins",
                BirthDay = new DateTime(1988, 10, 10)
            },
            new Contact
            {
                FirstName = "Henry",
                LastName = "Mitchell",
                Gender = "Male",
                Email = "henrymitchell@mail.com",
                PhoneNumber = "+1-202-555-0122",
                City = "Chicago",
                Address = "101 Fourth St",
                Instagram = "@henrymitchell",
                Facebook = "henrymitchell",
                BirthDay = new DateTime(1995, 6, 29)
            },
            new Contact
            {
                FirstName = "Samantha",
                LastName = "Hernandez",
                Gender = "Female",
                Email = "samanthahernandez@mail.com",
                PhoneNumber = "+1-202-555-0123",
                City = "Miami",
                Address = "234 Fifth St",
                Instagram = "@samanthahernandez",
                Facebook = "samanthahernandez",
                BirthDay = new DateTime(1992, 9, 1)
            },
            new Contact
            {
                FirstName = "Brian",
                LastName = "Lopez",
                Gender = "Male",
                Email = "brianlopez@mail.com",
                PhoneNumber = "+1-202-555-0124",
                City = "Austin",
                Address = "567 Sixth St",
                Instagram = "@brianlopez",
                Facebook = "brianlopez",
                BirthDay = new DateTime(1989, 3, 17)
            },
            new Contact
            {
                FirstName = "Rachel",
                LastName = "Perez",
                Gender = "Female",
                Email = "rachelperez@mail.com",
                PhoneNumber = "+1-202-555-0125",
                City = "Denver",
                Address = "890 Seventh St",
                Instagram = "@rachelperez",
                Facebook = "rachelperez",
                BirthDay = new DateTime(1991, 12, 28)
            }
        };

        foreach (var contact in contacts)
        {
            context.Contacts.Add(contact);
        }


        context.SaveChanges();
    }
}
