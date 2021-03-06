const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"')
                }
            }
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('not good email')
                }
            }
        },
        age: {
            type: Number,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a positive number')
                }
            }
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
        avatar : {
            type : Buffer
        }
    },
    {
        timestamps: true
    }
)

userSchema.virtual('tasks', {
    ref: 'Task', // The model to use
    localField: '_id', // Find 'tasks' where `localField`; (where id of user
    foreignField: 'ownerUser' // is equal to `foreignField`; equals to ownerUser)
})

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar


    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id: this.id.toString()}, process.env.JWT_SECRET)
    this.tokens.push({token: token})
    await this.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
    if (!user) {
        throw new Error('UserEmail not found')
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Wrong password')
    }
    return user
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 8)
    }
    return next()
})

userSchema.pre('remove', async function (next) {
    await Task.deleteMany({ownerUser: this._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User