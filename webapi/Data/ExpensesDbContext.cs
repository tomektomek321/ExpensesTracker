using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Data {
    public class ExpensesDbContext : DbContext {
        public ExpensesDbContext(DbContextOptions<ExpensesDbContext> options)
            : base(options) {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Id)
                .HasDatabaseName("idx_users_id");

            modelBuilder.Entity<Category>()
                .HasIndex(c => c.Id)
                .HasDatabaseName("idx_categories_id");

            modelBuilder.Entity<Transaction>()
                .HasIndex(t => new { t.UserId, t.CategoryId })
                .HasDatabaseName("idx_transactions_userid_categoryid");
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserId)
                .HasConstraintName("FK_Transactions_Users");
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Category)
                .WithMany(c => c.Transactions)
                .HasForeignKey(t => t.CategoryId)
                .HasConstraintName("FK_Transactions_Categories");

            modelBuilder.Entity<Budget>()
                .HasIndex(b => new { b.UserId, b.CategoryId })
                .HasDatabaseName("idx_budgets_userid_categoryid");
            modelBuilder.Entity<Budget>()
                .HasOne(b => b.User)
                .WithMany(u => u.Budgets)
                .HasForeignKey(b => b.UserId)
                .HasConstraintName("FK_Budgets_Users");
            modelBuilder.Entity<Budget>()
                .HasOne(b => b.Category)
                .WithMany(c => c.Budgets)
                .HasForeignKey(b => b.CategoryId)
                .HasConstraintName("FK_Budgets_Categories");

            modelBuilder.Entity<Receipt>()
                .HasIndex(r => r.TransactionId)
                .HasDatabaseName("idx_receipts_transactionid");
            modelBuilder.Entity<Receipt>()
                .HasOne(r => r.Transaction)
                .WithMany(t => t.Receipts)
                .HasForeignKey(r => r.TransactionId)
                .HasConstraintName("FK_Receipts_Transactions");

            modelBuilder.Entity<Subscription>()
                .HasIndex(s => s.UserId)
                .HasDatabaseName("idx_subscriptions_userid");
            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserId)
                .HasConstraintName("FK_Subscriptions_Users");
        }
    }
}
