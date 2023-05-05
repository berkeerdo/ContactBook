using System.ComponentModel.DataAnnotations;

namespace ContactBook.Entities;

public class Contact
{
    public Guid Id { get; set; }

    public string FirstName { get; set; }

    public string MiddleName { get; set; }

    public string LastName { get; set; }

    public string Gender { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }

    public string HomePhone { get; set; }

    public string WorkPhone { get; set; }

    public string City { get; set; }

    public string Address { get; set; }

    public string WorkAddress { get; set; }

    public string Instagram { get; set; }

    public string Facebook { get; set; }

    public string Twitter { get; set; }

    public string SnapChat { get; set; }

    public DateTime BirthDay { get; set; }

}
