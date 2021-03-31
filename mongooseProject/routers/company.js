const express = require("express");
const router = express.Router();
const Company = require('../models/company');
const path = require('path');
const Employee = require('../models/employee');


router.post("/addCompany", function (req, res) {

    const NEW_COMPANY = new Company({
        name: req.body.name,
        registerNumber: req.body.registerNumber,
        city: req.body.city,
        province: req.body.province,
        registerDate: req.body.registerDate,
        phoneNumber: req.body.phoneNumber,

    })

    NEW_COMPANY.save(function (err, company) {
        if (err) return res.status(500).send("Somthing went wrong in add user \n!" + err);
        return res.json({
            company,
            message: "User added successfully"
        })
    })

});

router.get("/allCompanies", (req, res) => {

    Company.find({}, (err, companies) => {
        if (err) return res.status(500).send("Somthing went wrong in get all users! \n" + err);
        return res.json(companies)
    })
});

router.put("/updateCompany/:companyId", (req, res) => {
    Company.findByIdAndUpdate(req.params.companyId, req.body, { new: true }, (err, company) => {
        if (err) return res.status(500).send("Somthing went wrong in update company! \n" + err);
        return res.json(company)
    })
});

router.delete("/deleteCompany/:companyId", (req, res) => {
    Company.findByIdAndDelete(req.params.companyId, (err, company) => {
        if (err) return res.status(500).send("Somthing went wrong in delete company! \n" + err);
        if (!company) return res.status(404).send("User not found")
        return res.json(company)
    })
});

router.get("/1year", (req, res) => {
    let currentDate = new Date;
    currentDate.setFullYear(currentDate.getFullYear() - 1);

    Company.find({ 'registerDate': { $gt: currentDate } }, 'name', (err, companies) => {
        if (err) return res.status(500).send("Somthing went wrong in get companies! \n" + err);
        return res.json(companies);
    })
});

router.put("/updateTehran", (req, res) => {

    Company.updateMany({}, { $set: { "city": "tehran", "province": "tehran" } }, (err, companies) => {
        if (err) return res.status(500).send("Somthing went wrong in update company! \n" + err);
        return res.json(companies)
    });
});


router.get("/", (req, res, next) => {

    res.sendFile(path.join(__dirname, '../public/html/companyPage.html'), function (err) {
        if (err) {
            res.status(err.status).end();
        }
    });

    router.get("/employees", (req, res) => {
        console.log('request arrived!');
        res.sendFile(path.join(__dirname, '../public/html/employeePage.html'));

    });

    router.get("/empincompany/:companyId", (req, res) => {
        console.log('request arrived!');
        
        Employee.find({ 'company': `${req.params.companyId}` }, (err, employees) => {
            if (err) return res.status(500).send("Somthing went wrong in get companies! \n" + err);
            return res.json(employees);
        })

    });

});

module.exports = router;