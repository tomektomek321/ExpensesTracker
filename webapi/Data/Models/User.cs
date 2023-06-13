using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace webapi.Data.Models
{
    public class User : IdentityUser
    {
        // Navigation properties
        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<Budget> Budgets { get; set; }
        public ICollection<Subscription> Subscriptions { get; set; }
        public ICollection<Role> Roles { get; set; } = new List<Role>();
    }
}
