using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace webapi.Models
{
    public class Budget
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid CategoryId { get; set; }
        public decimal Amount { get; set; }
        public string Period { get; set; } 
        public UserRegistration User { get; set; }
        public Category Category { get; set; }
    }
}
