using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Managers {
    public class CategoryManager {
        private Data.ExpensesDbContext _context;
        public CategoryManager(Data.ExpensesDbContext pContext) {
            _context = pContext;
        }
        public IEnumerable<Models.Category> GetCategories() {
            return _context.Categories.AsEnumerable().OrderBy(x=>x.Name);
        }
    }
}
