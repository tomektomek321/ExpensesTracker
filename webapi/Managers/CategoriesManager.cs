using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using webapi.Data.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Managers
{
    public class CategoriesManager {
        private Data.ExpensesDbContext _context;
        public CategoriesManager(Data.ExpensesDbContext pContext) {
            _context = pContext;
        }
        public IEnumerable<Models.Category> GetCategories() {
            IOrderedEnumerable<Category> dbCategories = _context.Categories.AsEnumerable().OrderBy(x=>x.Name);
            return dbCategories.Select(x => new Models.Category(x)).ToList();
        }
        public Models.Category AddCategory(Models.Category pCategory) {
            Category inserted =  _context.Categories.Add(new Data.Models.Category(pCategory)).Entity;
            _context.SaveChanges();
            return new Models.Category(inserted);
        }
        public Category GetCategoryById(Guid pCategoryId) {
            return _context.Categories.Where(x=>x.Id == pCategoryId).FirstOrDefault();
        }
    }
}
