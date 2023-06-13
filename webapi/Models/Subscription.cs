using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace webapi.Models
{
    public class Subscription
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public DateTime RenewalDate { get; set; }
    }
}
