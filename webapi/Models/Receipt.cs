using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace webapi.Models {
    public class Receipt {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid TransactionId { get; set; }
        public byte[] Image { get; set; }

        // Navigation properties
        [ForeignKey("TransactionId")]
        public Transaction Transaction { get; set; }
    }
}
