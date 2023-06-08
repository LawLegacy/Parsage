using AutoMapper;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test_Task.ViewModels;

namespace Test_Task.Controllers
{
    [Route("api/[controller]")]
    public class BikeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILogger _logger;


        public BikeController(IMapper mapper, ILogger<BikeController> logger)
        {
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            BikeFacade bikeFacade = new BikeFacade();
            var allBikes = bikeFacade.GetAllBikes();

            foreach (var bike in allBikes)
            {

            }

            return Ok(_mapper.Map<IEnumerable<BikeViewModel>>(allBikes));
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value: " + id;
        }



        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }



        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }



        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
