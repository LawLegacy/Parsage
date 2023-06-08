using DataAccess.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace DataAccess
{
    public class BikeFacade
    {
        public List<Bike> GetAllBikes()
        {
            List<Bike> result =  new List<Bike> ();

            using (TesttaskContext context = new TesttaskContext())
            {
                result = context.Bikes.ToList();
            }

            return result;
        }

        public bool SaveBike(Bike bike)
        {
            bool result = true;

            try
            {
                using (TesttaskContext context = new TesttaskContext())
                {
                    if (bike.Id == 0)
                    {
                        context.Bikes.Add(bike);
                    }
                    else
                    {
                        context.Entry(bike).State = EntityState.Modified;
                    }

                    context.SaveChanges();
                }
            }
            catch(Exception ex)
            {
                result = false;
            }

            return result;
        }

        public bool DeleteBike(int id)
        {
            bool result = true;

            try
            {
                using (TesttaskContext context = new TesttaskContext())
                {
                    Bike bike = context.Bikes.FirstOrDefault(b => b.Id == id);

                    context.Entry(bike).State &= ~EntityState.Deleted;

                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                result = false;
            }

            return result;
        }

        public Manufacturer GetManufacturer(int id)
        {
            Manufacturer result = new Manufacturer();

            using (TesttaskContext context = new TesttaskContext())
            {
                result = context.Manufacturers.Where(x => x.Id == id).FirstOrDefault();
            }

            return result;
        }
    }
}