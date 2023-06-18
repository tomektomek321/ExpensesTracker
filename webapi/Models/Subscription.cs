using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Text.Json.Serialization;

namespace webapi.Models {
    public class Subscription {
        public Guid Id { get; set; }
        [JsonIgnore]
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public DateTime RenewalDate { get; set; }
        public Subscription() {

        }
        public Subscription(Data.Models.Subscription pSubscription) {
            this.Id = pSubscription.Id;
            this.RenewalDate = pSubscription.RenewalDate;
            this.Name = pSubscription.Name;
            this.Amount = pSubscription.Amount;
            this.UserId = new Guid(pSubscription.UserId);
        }
    }
}
