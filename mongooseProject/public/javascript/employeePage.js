$(document).ready(function () {

    let employee_id;

    let modalType = 'create';


    var url = new URL(window.location.href);
    console.log(url);

    var company = url.searchParams.get("company");
    console.log(company);

    $.get(`http://localhost:3000/company/empincompany/${company}`, function (data, status) {

        let employees = JSON.stringify(data);
        employees = JSON.parse(employees);
        console.log(employees);
        for (let i = 0; i < employees.length; i++) {
            let gender = 'male';

            if (!employees[i].gender) {
                gender = 'female';
            }

            let empBirthDate = new Date(employees[i].birthDate);

            $('tbody').append(`<tr><th scope="row">${i + 1}</th>
            <td>${employees[i].fname}</td>
            <td>${employees[i].lname}</td>
            <td>${employees[i].nationalNumber}</td>
            <td>${gender}</td>
            <td>${employees[i].isManager}</td>
            <td>${empBirthDate.getFullYear()}/${empBirthDate.getMonth() + 1}/${empBirthDate.getDay() + 1}</td>
            <td><button class="mr-2 btn btn_delete_employee" id="${employees[i]._id}">delete</button>
            <button class="btn" data-toggle="modal" id="btn-modal-update-employee" data-target="#addEmployeeModal">Edit</button></td>     
              </tr>`);

        }
        console.log(data);
    });

    $('body').on('click', '#btn_add_employee', function () {
        let empGender = true;

        if ($('input[name = radio-gender]:checked').val() === 'female')
            empGender = false;
        if (modalType === "create") {
            console.log('create modal');
            $.post("http://localhost:3000/employee/addEmployee",
                {
                    fname: $("#inp-fname").val(),
                    lname: $("#inp-lname").val(),
                    nationalNumber: $("#inp-nationalnumber").val(),
                    gender: empGender,
                    isManager: $("#inp-ismanager").val(),
                    birthDate: $("#inp-birthdate").val(),
                    company: company,

                },
                function (data, status) {
                    console.log(data);
                    location.reload();
                });
        }
        else {
            console.log('update modal');          
        let data = {
            "fname": $("#inp-fname").val(),
            "lname":$("#inp-lname").val(),
            "nationalNumber": $("#inp-nationalnumber").val(),
            "gender":empGender,
            "isManager":$("#inp-ismanager").val(),
            "birthDate":$("#inp-birthdate").val(),
            "company":company

        }
        $.ajax({
            url: `http://localhost:3000/employee/updateEmployee/${employee_id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result) {
                console.log("company is updated");
                location.reload();
            }
        });
        }
    })


    $('tbody').on('click', '.btn_delete_employee', function () {
        employee_id = $(this).attr('id');
        $.ajax({
            url: `/employee/deleteEmployee/${employee_id}`,
            type: 'DELETE',
            success: function (result) {
                console.log("employee was deleted");
                location.reload();
            }
        });


    })

    $('body').on('click', '#btn-modal-add-employee', function () {
        modalType = 'create';
    })

    $('body').on('click', '#btn-modal-update-employee', function () {
        employee_id = $(this).attr('id');
        modalType = 'update';

    })
})

