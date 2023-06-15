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
    public class SubscriptionsController : ControllerBase {
        private readonly ILogger<SubscriptionsController> _logger;
        private Data.ExpensesDbContext _context;
        private Managers.SubscriptionsManager _subscriptionsManager;
        public SubscriptionsController(ILogger<SubscriptionsController> pLogger, Data.ExpensesDbContext pContext) {
            _logger = pLogger;
            _context = pContext;
            _subscriptionsManager = new Managers.SubscriptionsManager(_context);
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Models.Subscription>> Get() {
            try {
                string userId = GetUserId();
                return new OkObjectResult(_subscriptionsManager.GetSubscriptions(userId));
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
        public ActionResult<Models.Subscription> GetSubscriptionById([FromRoute] Guid pId) {
            string userId = GetUserId();
            var category = _subscriptionsManager.GetSubscriptionById(pId, userId);
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
        public ActionResult<Models.Subscription> Post([FromBody] Models.Subscription pSubscription) {
            try {
                if (ModelState.IsValid) {
                    string userId = GetUserId();
                    var transaction = _subscriptionsManager.AddSubscription(pSubscription, userId);
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
                _subscriptionsManager.DeleteSubscription(pId, userId);
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
