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
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
});


module.exports = mongoose.model('employee', employeeSchema);



