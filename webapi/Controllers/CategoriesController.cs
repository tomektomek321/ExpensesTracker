using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase {
        private readonly ILogger<CategoriesController> _logger;
        private Data.ExpensesDbContext _context;
        private Managers.CategoriesManager _categoryManager;
        public CategoriesController(ILogger<CategoriesController> pLogger, Data.ExpensesDbContext pContext) {
            _logger = pLogger;
            _context = pContext;
            _categoryManager = new Managers.CategoriesManager(_context);
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Models.Category>> Get() {
            try {
                return new OkObjectResult(_categoryManager.GetCategories());
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message, ex.StackTrace);
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Route("{pId}")]
        public ActionResult<Models.Category> GetCategoryById([FromRoute] Guid pId) {
            var category = _categoryManager.GetCategoryById(pId);
            if (null == category) {
                return NotFound();
            }
            else {
                return new OkObjectResult(category);
            }
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Models.Category> CreateCategory([FromBody]Models.Category pCategory) {
            try {
                if (ModelState.IsValid) {
                    var category = _categoryManager.AddCategory(pCategory);
                    return new OkObjectResult(category);
                }
                else {
                    return BadRequest(ModelState.ValidationState);
                }

            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
