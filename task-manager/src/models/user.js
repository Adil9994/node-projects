const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name : {
        type : String,
        required: true
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength : 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    email: {
        type : String,
        required : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('not good email')
            }
        }
    },
    age : {
        type : Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

module.exports = User