using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Text.Json.Serialization;

namespace webapi.Models
{
    public class Budget
    {
        public Guid Id { get; set; }
        [JsonIgnore]
        public Guid UserId { get; set; }
        public Guid CategoryId { get; set; }
        public decimal Amount { get; set; }
        public decimal? Remaining { get; set; }
        public Enums.BudgetPeriod Period { get; set; }
        public Budget(Data.Models.Budget pBudget) {
            this.Id = pBudget.Id;
            this.CategoryId = pBudget.CategoryId;
            this.Amount = pBudget.Amount;
            this.Period = pBudget.Period;
            this.UserId = new Guid(pBudget.UserId);
        }
        public Budget(Data.Models.Budget pBudget, decimal pRemainingAmount) {
            this.Id = pBudget.Id;
            this.CategoryId = pBudget.CategoryId;
            this.Amount = pBudget.Amount;
            this.Period = pBudget.Period;
            this.UserId = new Guid(pBudget.UserId);
            this.Remaining = pRemainingAmount;
        }
    }
}
