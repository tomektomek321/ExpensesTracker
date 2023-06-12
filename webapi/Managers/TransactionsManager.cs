using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Managers
{
    public class TransactionsManager {
        private Data.ExpensesDbContext _context;
        public TransactionsManager(Data.ExpensesDbContext pContext) {
            _context = pContext;
        }
        public IEnumerable<Models.Transaction> GetTransacations(DateTime? pTransactionsDate) {
            IOrderedEnumerable<Data.Models.Transaction> dbCategories = _context.Transactions.Where(x=>x.Date.Date == (pTransactionsDate ?? x.Date.Date)).AsEnumerable().OrderBy(x=>x.Date);
            return dbCategories.Select(x => new Models.Transaction(x)).ToList();
        }
        public Models.Transaction AddTransaction(Models.Transaction pTransaction) {
            var dbTransaction = new Data.Models.Transaction();
            dbTransaction.UserId = pTransaction.UserId;
            dbTransaction.CategoryId = pTransaction.CategoryId;
            dbTransaction.Date = pTransaction.Date;
            dbTransaction.Amount = pTransaction.Amount;
            dbTransaction.Note = pTransaction.Note;
            Data.Models.Transaction inserted =  _context.Transactions.Add(dbTransaction).Entity;
            _context.SaveChanges();
            return new Models.Transaction(inserted);
        }
        public Models.Transaction GetTransactionById(Guid pCategoryId) {
            Data.Models.Transaction? dbTransaction = _context.Transactions.Where(x=>x.Id == pCategoryId).FirstOrDefault();
            Models.Transaction transaction = null;
            if (dbTransaction != null) {
                transaction = new Models.Transaction(dbTransaction);
            }
            return transaction;
        }
    }
}
