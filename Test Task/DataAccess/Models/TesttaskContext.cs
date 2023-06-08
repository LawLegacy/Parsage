using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Models
{

    public partial class TesttaskContext : DbContext
    {
        public TesttaskContext()
        {
        }

        public TesttaskContext(DbContextOptions<TesttaskContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bike> Bikes { get; set; }

        public virtual DbSet<Manufacturer> Manufacturers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
            => optionsBuilder.UseSqlServer("Server=localhost;Database=testtask;Trusted_Connection=True;TrustServerCertificate=true");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bike>(entity =>
            {
                entity.ToTable("Bike");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.Model).HasMaxLength(150);
                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Manufacturer).WithMany(p => p.Bikes)
                    .HasForeignKey(d => d.ManufacturerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bike_Manufacturer");
            });

            modelBuilder.Entity<Manufacturer>(entity =>
            {
                entity.ToTable("Manufacturer");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.Manufacturer1)
                    .HasMaxLength(150)
                    .HasColumnName("Manufacturer");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
