const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
    fname: {
        type: String,
        unique: true,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    nationalNumber: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    isManager: {
        type: Boolean,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('employee', employeeSchema);



