$(document).ready(function () {
    let company_id;
    
    
    loadCompany();

    function loadCompany() {
        $.get("http://localhost:3000/company/allCompanies", function (data, status) {
            let companies = JSON.stringify(data);
            companies = JSON.parse(companies);
            for (let i = 0; i < data.length; i++) {
                $("#companyList_ul").append(` <li class = "list-group-item d-flex flex-row-reverse">
                <button class="mx-2 btn-delete btn" id="${companies[i]._id}">Delete</button>
                <button class="mx-2 btn-edit btn" id="${companies[i]._id}" data-toggle="modal" data-target="#updateCompanyModal">Edit</button>
                <span class="w-100">${companies[i].phoneNumber}</span>
                <span class="w-100">${companies[i].city}</span>
                <span class="w-100">${companies[i].name}</span></li>`);
            }

        });
    }

    $('#companyList_ul').on('click', '.btn-delete', function () {
        company_id = $(this).attr('id');
        $.ajax({
            url: `/company/deleteCompany/${company_id}`,
            type: 'DELETE',
            success: function (result) {
                console.log("company is deleted");
                location.reload();
            }
        });

    })

    $('#companyList_ul').on('click', '.btn-edit', function () {
        company_id = $(this).attr('id');
        console.log(company_id);
  

    })

    $('.modal-footer').on('click', '#btn-update', function () {

        let data = {
            "name": $("#update-name").val(),
            "registerNumber":$("#update-register-number").val(),
            "city":$("#update-city").val(),
            "province":$("#update-province").val(),
            "registerDate":$("#update-register-date").val(),
            "phoneNumber":$("#update-phone-number").val()
        }

        $.ajax({
            url: `/company/updateCompany/${company_id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result) {
                console.log("company is updated");
                location.reload();
            }
        });

    })

 

    $('.modal-footer').on('click', '#btn-add', function () {
        console.log("click");
        $.post("/company/addCompany",
            {
                name: $("#inp-name").val(),
                registerNumber: $("#inp-register-number").val(),
                city: $("#inp-city").val(),
                province: $("#inp-province").val(),
                registerDate: $("#inp-register-date").val(),
                phoneNumber: $("#inp-phone-number").val(),
            },
            function (data, status) {
                console.log(data);
                location.reload();
            });

    })


});

