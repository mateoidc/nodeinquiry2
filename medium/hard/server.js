var express = require("express");

var app = express();

var data = require("./employees.json"); //lets me access the data base

app.use(express.json()); //turns the file into json

app.get("/employee", (req, res) => {
  if (!data) {
    res.status(404).send("Could not find the information");
  }
  res.send(data);
});

app.get("/employee/:id", (req, res) => {
  const findEmployee = data.employee.find(function (employee) {
    return parseInt(req.params.id) === employee.id;
  });

  if (!findEmployee) {
    res.status(404).send("Could not find the information");
  }
  res.send(findEmployee);
});

app.post("/employee", (req, res) => {
  const findEmployee = {
    id: data.employee.length + 1,
    name: req.body.name,
    salary: req.body.salary,
    building: req.body.building,
  };

  if (!findEmployee) {
    res.status(404).send("Could not find the information");
  }
  res.send(findEmployee);

  return;
});

app.put("/employee/:id", (req, res) => {
  const findEmployee = data.employee.find(function (employee) {
    return parseInt(req.params.id) === employee.id;
  });
  if (!findEmployee) {
    res.status(404).send("Could not find the information");
  }
  console.log(req.body);
  console.log(`After`);
  findEmployee.name = req.body.name;
  findEmployee.salary = req.body.salary;
  findEmployee.building = req.body.building;

  res.send(data);
});

app.delete("/employee/:id", (req, res) => {
  const findEmployee = data.employee.find(function (employee) {
    return parseInt(req.params.id) === employee.id;
  });

  if (!findEmployee) {
    res.status(404).send("Could not find information");
  }

  const index = data.employee.indexOf(findEmployee);
  data.employee.splice(index, 1);

  res.send(findEmployee);
});

const port = process.env.PORT || 3000;

app.listen(3000);
