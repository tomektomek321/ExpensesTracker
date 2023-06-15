using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Managers
{
    public class SubscriptionsManager {
        private Data.ExpensesDbContext _context;
        public SubscriptionsManager(Data.ExpensesDbContext pContext) {
            _context = pContext;
        }
        public IEnumerable<Models.Subscription> GetSubscriptions(string pUserId) {
            IOrderedEnumerable<Data.Models.Subscription> dbCategories = _context.Subscriptions
                    .Where(x=>
                        x.UserId == pUserId)
                    .AsEnumerable()
                    .OrderBy(x=>x.RenewalDate);
            return dbCategories.Select(x => new Models.Subscription(x)).ToList();
        }
        public Models.Subscription AddSubscription(Models.Subscription pSubscription, string pUserId) {
            var dbSubscription = new Data.Models.Subscription();
            dbSubscription.UserId = pUserId;
            dbSubscription.RenewalDate = pSubscription.RenewalDate;
            dbSubscription.Amount = pSubscription.Amount;
            dbSubscription.Name = pSubscription.Name;
            Data.Models.Subscription inserted =  _context.Subscriptions.Add(dbSubscription).Entity;
            _context.SaveChanges();
            return new Models.Subscription(inserted);
        }
        public Models.Subscription GetSubscriptionById(Guid pTransactionId, string pUserId) {
            Data.Models.Subscription? dbSubscription = _context.Subscriptions
                    .Where(x=>
                        x.Id == pTransactionId 
                        && x.UserId == (pUserId ?? x.UserId))
                    .FirstOrDefault();
            Models.Subscription subscription = null;
            if (dbSubscription != null) {
                subscription = new Models.Subscription(dbSubscription);
            }
            return subscription;
        }
        public void DeleteSubscription(Guid pSubscriptionId, string pUserId) {
            Data.Models.Subscription? dbSubscription = _context.Subscriptions.FirstOrDefault(x=>x.Id == pSubscriptionId && x.UserId == (pUserId ?? x.UserId));
            if (null != dbSubscription) {
                _context.Subscriptions.Remove(dbSubscription);
                _context.SaveChanges();
            }
            else {
                throw new KeyNotFoundException();
            }
                
        }
    }
}
