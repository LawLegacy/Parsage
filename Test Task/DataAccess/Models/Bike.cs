using System;
using System.Collections.Generic;

namespace DataAccess.Models
{

    public partial class Bike
    {
        public int Id { get; set; }

        public int ManufacturerId { get; set; }

        public string Model { get; set; } = null!;

        public int FrameSize { get; set; }

        public decimal Price { get; set; }

        public virtual Manufacturer Manufacturer { get; set; } = null!;
    }
}
