
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Security.Claims;


namespace webapi.Controllers {
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetsController : ControllerBase {
        private readonly ILogger<BudgetsController> _logger;
        private Data.ExpensesDbContext _context;
        private Managers.BudgetsManager _budgetsManager;
        public BudgetsController(ILogger<BudgetsController> pLogger, Data.ExpensesDbContext pContext) {
            _logger = pLogger;
            _context = pContext;
            _budgetsManager = new Managers.BudgetsManager(_context);
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Models.Budget>> Get([FromQuery(Name = "date")] DateTime? pBudgetDate) {
            try {
                string userId = Worker.ExtractUserId(User);
                return new OkObjectResult(_budgetsManager.GetBudgets(userId, pBudgetDate));
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
        public ActionResult<Models.Budget> GetBudgetById([FromRoute] Guid pId) {
            string userId = Worker.ExtractUserId(User);
            var category = _budgetsManager.GetBudgetById(pId, userId);
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
        public ActionResult<Models.Budget> Post([FromBody] Models.Budget pBudget) {
            try {
                if (ModelState.IsValid) {
                    string userId = Worker.ExtractUserId(User);
                    var transaction = _budgetsManager.AddBudget(pBudget, userId);
                    return new OkObjectResult(transaction);
                }
                else {
                    return BadRequest(ModelState.ValidationState);
                }

            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Route("{pId}")]
        public ActionResult Delete([FromRoute] Guid pId) {
            try {
                string userId = Worker.ExtractUserId(User);
                _budgetsManager.DeleteBudget(pId, userId);
                return new NoContentResult();
            }
            catch (KeyNotFoundException ex) {
                return new NotFoundResult();
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
