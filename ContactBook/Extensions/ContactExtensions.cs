using System;
using System.Collections.Generic;
using System.Linq;
using ContactBook.Entities;

namespace ContactBook.Extensions
{
    public static class ContactExtensions
    {
        public static IQueryable<Contact> Sort(this IQueryable<Contact> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy) || orderBy.ToLower() != "name")
            {
                return query.OrderBy(p => p.FirstName);
            }


            return query.OrderBy(p => p.FirstName);
        }

        public static IQueryable<Contact> Search(this IQueryable<Contact> query, string search)
        {
            if (string.IsNullOrEmpty(search))
                return query;

            var lowerCaseSearch = search.Trim().ToLower();

            return query.Where(
            c =>
            c.FirstName.ToLower().Contains(lowerCaseSearch)
            || c.LastName.ToLower().Contains(lowerCaseSearch)
            || c.Email.ToLower().Contains(lowerCaseSearch)
            || c.PhoneNumber.ToLower().Contains(lowerCaseSearch)
            );
        }
    }
}
