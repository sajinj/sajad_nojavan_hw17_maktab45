const express = require("express");
const router = express.Router();
const Employee = require('../models/employee');

router.post("/addEmployee", function(req, res) {
    const NEW_EMPLOYEE = new Employee({
        fname: req.body.fname,
        lname: req.body.lname,
        nationalNumber: req.body.nationalNumber,
        gender: req.body.gender,
        isManager: req.body.isManager,
        birthDate: req.body.birthDate,

    })
    NEW_EMPLOYEE.save(function(err, user) {        
        if (err) return res.status(500).send("Somthing went wrong in add user \n!" + err);
        return res.json({
            user,
            message: "Employee added successfully"
        })
    })
});

router.get("/allEmployees", (req, res) => {
    Employee.find({}, (err, employees) => {
        if (err) return res.status(500).send("Something went wrong in get all employees! \n" + err);
        return res.json(employees)
    })
});

router.put("/updateEmployee/:employeeId", (req, res) => {
    Employee.findByIdAndUpdate(req.params.employeeId, req.body, {new: true}, (err, employee) => {
        if (err) return res.status(500).send("Something went wrong in update employee! \n" + err);
        return res.json(employee)
    })
});


router.delete("/deleteEmployee/:employeeId", (req, res) => {
  Employee.findByIdAndDelete(req.params.employeeId, (err, employee) => {
        if (err) return res.status(500).send("Something went wrong in delete employee! \n" + err);
        if (!employee) return res.status(404).send("employee not found")
        return res.json(employee)
    })
});

router.get("/age20to30",(req, res)=>{
    let startDate = new Date;
    let endDate = new Date;

    startDate.setFullYear( startDate.getFullYear() - 30 );
    endDate.setFullYear(endDate.getUTCFullYear()-20);

    Employee.find({'birthDate':{$gt:startDate, $lt:endDate}},{"_id":0},(err, employees)=>{
        if (err) return res.status(500).send("Somthing went wrong in get companies! \n" + err);
        return res.json(employees);
    })  
});

router.get("/allManagers",(req, res)=>{
    Employee.find({'isManager':true},(err, employees)=>{
        if (err) return res.status(500).send("Somthing went wrong in get companies! \n" + err);
        return res.json(employees);
    })  
});



module.exports = router;