using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase {
        private readonly ILogger<CategoryController> _logger;
        private Data.ExpensesDbContext _context;
        private Managers.CategoryManager _categoryManager;
        public CategoryController(ILogger<CategoryController> pLogger, Data.ExpensesDbContext pContext) {
            _logger = pLogger;
            _context = pContext;
            _categoryManager = new Managers.CategoryManager(_context);
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<Models.Category> Get() {
            return _categoryManager.GetCategories();
        }
    }
}
