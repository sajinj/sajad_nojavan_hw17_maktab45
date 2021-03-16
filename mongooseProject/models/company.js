const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    registerNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Company', CompanySchema);



