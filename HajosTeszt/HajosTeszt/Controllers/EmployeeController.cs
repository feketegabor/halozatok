using HajosTeszt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        [Route("employee/count")]
        public int M3()
        {
            CRUDE_dbContext context = new CRUDE_dbContext();
            var dolgozokSzama = (from x in context.Employees select x.EmployeeId).Count();

            return dolgozokSzama;
        }
    }
}
