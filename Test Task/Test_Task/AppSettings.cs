using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test_Task
{
    public class AppSettings
    {
        public ConnectionStrings ConnectionStrings { get; set; }

    }

    public class ConnectionStrings
    {
        public string DefaultConnection { get; set; }
    }
}
