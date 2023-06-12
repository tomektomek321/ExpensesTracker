using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace webapi.Data.Models
{
    public class Receipt
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public Guid TransactionId { get; set; }
        public byte[] Image { get; set; }

        // Navigation properties
        [ForeignKey("TransactionId")]
        public Transaction Transaction { get; set; }
    }
}
