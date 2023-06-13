using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace webapi.Data.Models
{
    public class Role : IdentityRole {
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
