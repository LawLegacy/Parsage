using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace DataAccess.Models
{ 
    public partial class Manufacturer
    {
        public int Id { get; set; }

        public string Manufacturer1 { get; set; } = null!;

        public virtual ICollection<Bike> Bikes { get; } = new List<Bike>();
    }
}
