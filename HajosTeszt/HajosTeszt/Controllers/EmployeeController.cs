﻿using HajosTeszt.EmployeeModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        [Route("count")]
        public int M1()
        {
            Leadando_dbContext context = new Leadando_dbContext();
            var employeeCount = (from x in context.Employees select x.EmployeeId).Count();

            return employeeCount;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            Leadando_dbContext context = new Leadando_dbContext();
            return context.Employees.ToList();
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            Leadando_dbContext context = new Leadando_dbContext();
            var keresettDolgozo = (from x in context.Employees
                                where x.EmployeeId == id
                                select x).FirstOrDefault();
            return keresettDolgozo;
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public void Post([FromBody] Employee newEmployee)
        {
            Leadando_dbContext context = new Leadando_dbContext();
            context.Employees.Add(newEmployee);
            context.SaveChanges();
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Leadando_dbContext context = new Leadando_dbContext();
            var torlendoDolgozo = (from x in context.Employees
                                where x.EmployeeId == id
                                select x).FirstOrDefault();
            context.Remove(torlendoDolgozo);
            context.SaveChanges();
        }
    }
}
