using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;

namespace webapi.Models {
    public class Transaction {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid CategoryId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Note { get; set; }
        public Transaction() {

        }
        public Transaction(Data.Models.Transaction pTransaction) {
            this.Id = pTransaction.Id;
            this.UserId = pTransaction.UserId;
            this.CategoryId = pTransaction.CategoryId;
            this.Amount = pTransaction.Amount;
            this.Date = pTransaction.Date;
            this.Note = pTransaction.Note;
        }
    }
}
