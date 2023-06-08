using DataAccess.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

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
    }
}