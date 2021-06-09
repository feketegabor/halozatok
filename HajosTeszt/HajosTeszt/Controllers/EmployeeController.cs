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
        public int M1()
        {
            CRUDE_dbContext context = new CRUDE_dbContext();
            var dolgozokSzama = (from x in context.Employees select x.EmployeeId).Count();

            return dolgozokSzama;
        }

        [HttpGet]
        [Route("employee/all")]
        public ActionResult M2()
        {
            CRUDE_dbContext context = new CRUDE_dbContext();
            var dolgozok = from x in context.Employees select new { x.FirstName, x.LastName };

            return new JsonResult(dolgozok);
        }

        [HttpGet]
        [Route("employee/{id}")]
        public ActionResult M3(int id)
        {
            CRUDE_dbContext context = new CRUDE_dbContext();
            var dolgozo = (from x in context.Employees
                          where x.EmployeeId == id
                          select x).FirstOrDefault();

            if (dolgozo == null) return BadRequest("Nincs ilyen ID-vel rendelkező dolgozó");

            return new JsonResult(dolgozo);
        }
    }
}
