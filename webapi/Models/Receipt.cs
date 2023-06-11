using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace webapi.Models
{
    public class Receipt
    {
        public Guid Id { get; set; }
        public Guid TransactionId { get; set; }
        public byte[] Image { get; set; }
    }
}
