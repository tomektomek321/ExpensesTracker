using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace webapi.Models {
    public class Category {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Category(Data.Models.Category pCategory) {
            this.Id = pCategory.Id;
            this.Name = pCategory.Name;
        }
    }
}
