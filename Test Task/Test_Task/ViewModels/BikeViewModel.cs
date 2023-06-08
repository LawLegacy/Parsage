using DataAccess.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Test_Task.ViewModels
{
    public class BikeViewModel
    {
        public int Id { get; set; }

        public int ManufacturerId { get; set; }

        public string Model { get; set; } = null!;

        public int FrameSize { get; set; }

        public decimal Price { get; set; }

        public virtual Manufacturer Manufacturer { get; set; } = null!;

    }

}
