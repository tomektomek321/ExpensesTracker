using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using webapi.Extensions;

namespace webapi.Managers
{
    public class BudgetsManager {
        private Data.ExpensesDbContext _context;
        public BudgetsManager(Data.ExpensesDbContext pContext) {
            _context = pContext;
        }
        public IEnumerable<Models.Budget> GetBudgets(string pUserId, DateTime? pBudgetDate) {
            IOrderedEnumerable<Data.Models.Budget> dbBudgets = _context.Budgets
                    .Where(x=>
                        x.UserId == pUserId)
                    .AsEnumerable()
                    .OrderBy(x=>x.Category.Name);
            if (null != pBudgetDate) {
            return dbBudgets.Select(b => 
                new Models.Budget(
                    b, 
                    b.Amount - _context.Transactions.Where(
                        t=>t.UserId == pUserId 
                        && t.CategoryId == b.CategoryId
                        && (
                            b.Period == Enums.BudgetPeriod.Weekly 
                            && t.Date.GetWeekNumber() == pBudgetDate.Value.GetWeekNumber() 
                            && t.Date.Year == pBudgetDate.Value.Year
                            ) 
                            || (b.Period == Enums.BudgetPeriod.Monthly
                            && t.Date.Month == pBudgetDate.Value.Month
                            && t.Date.Year == pBudgetDate.Value.Year
                            )
                            || (b.Period == Enums.BudgetPeriod.Yearly
                            && t.Date.Year == pBudgetDate.Value.Year
                            )
                        ).Sum(x=>x.Amount))).ToList();
            }
            else {
                return dbBudgets.Select(b => new Models.Budget(b)).ToList();
            }
        }
        public Models.Budget AddBudget(Models.Budget pBudget, string pUserId) {
            var dbBudget = new Data.Models.Budget();
            dbBudget.UserId = pUserId;
            dbBudget.Amount = pBudget.Amount;
            dbBudget.Period = pBudget.Period;
            dbBudget.CategoryId = pBudget.CategoryId;
            Data.Models.Budget inserted =  _context.Budgets.Add(dbBudget).Entity;
            _context.SaveChanges();
            return new Models.Budget(inserted);
        }
        public Models.Budget GetBudgetById(Guid pTransactionId, string pUserId) {
            Data.Models.Budget? dbBudget = _context.Budgets
                    .Where(x=>
                        x.Id == pTransactionId 
                        && x.UserId == (pUserId ?? x.UserId))
                    .FirstOrDefault();
            Models.Budget budget = null;
            if (dbBudget != null) {
                budget = new Models.Budget(dbBudget);
            }
            return budget;
        }
        public void DeleteBudget(Guid pBudgetId, string pUserId) {
            Data.Models.Budget? dbBudget = _context.Budgets.FirstOrDefault(x=>x.Id == pBudgetId && x.UserId == (pUserId ?? x.UserId));
            if (null != dbBudget) {
                _context.Budgets.Remove(dbBudget);
                _context.SaveChanges();
            }
            else {
                throw new KeyNotFoundException();
            }
                
        }
    }
}
