using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Managers
{
    public class CategoriesManager {
        private Data.ExpensesDbContext _context;
        public CategoriesManager(Data.ExpensesDbContext pContext) {
            _context = pContext;
        }
        public IEnumerable<Models.Category> GetCategories() {
            IOrderedEnumerable<Data.Models.Category> dbCategories = _context.Categories.AsEnumerable().OrderBy(x=>x.Name);
            return dbCategories.Select(x => new Models.Category(x)).ToList();
        }
        public Models.Category AddCategory(Models.Category pCategory) {
            var dbCategory = new Data.Models.Category();
            dbCategory.Name = pCategory.Name;
            Data.Models.Category inserted =  _context.Categories.Add(dbCategory).Entity;
            _context.SaveChanges();
            return new Models.Category(inserted);
        }
        public Models.Category GetCategoryById(Guid pCategoryId) {
            Data.Models.Category? dbCategory = _context.Categories.Where(x=>x.Id == pCategoryId).FirstOrDefault();
            Models.Category category = null;
            if (dbCategory != null) {
                category = new Models.Category(dbCategory);
            }
            return category;
        }
    }
}
