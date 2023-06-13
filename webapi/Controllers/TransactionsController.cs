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
    public class TransactionsController : ControllerBase {
        private readonly ILogger<TransactionsController> _logger;
        private Data.ExpensesDbContext _context;
        private Managers.TransactionsManager _transactionsManager;
        public TransactionsController(ILogger<TransactionsController> pLogger, Data.ExpensesDbContext pContext) {
            _logger = pLogger;
            _context = pContext;
            _transactionsManager = new Managers.TransactionsManager(_context);
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Models.Transaction>> Get([FromQuery(Name = "date")] DateTime? pTransactionsDate) {
            try {
                string userId = GetUserId();
                return new OkObjectResult(_transactionsManager.GetTransacations(pTransactionsDate, userId));
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
        public ActionResult<Models.Category> GetTransactionById([FromRoute] Guid pId) {
            string userId = GetUserId();
            var category = _transactionsManager.GetTransactionById(pId, userId);
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
        public ActionResult<Models.Category> Post([FromBody] Models.Transaction pTransaction) {
            try {
                if (ModelState.IsValid) {
                    string userId = GetUserId();
                    var transaction = _transactionsManager.AddTransaction(pTransaction, userId);
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
                string userId = GetUserId();
                _transactionsManager.DeleteTransaction(pId, userId);
                return new NoContentResult();
            }
            catch (KeyNotFoundException ex) {
                return new NotFoundResult();
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
        private string GetUserId() {
            return User.FindFirstValue(ClaimTypes.NameIdentifier); 
        }
    }
}
