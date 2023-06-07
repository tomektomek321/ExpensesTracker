using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Transactions;

namespace webapi.Models {
    public class User {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string Password { get; set; } // Hashed password

        // Navigation properties
        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<Budget> Budgets { get; set; }
        public ICollection<Subscription> Subscriptions { get; set; }
    }
}
