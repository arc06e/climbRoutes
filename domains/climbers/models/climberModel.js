const mongoose = require('mongoose');
//const validator = require('validator');
const bcrypt = require('bcryptjs');

const climberSchema = new mongoose.Schema({
    //name
    name: {
        type: String,
        minLength: [1, 'name must have at least 1 character'],
        maxLength: [25, 'name cannot have more than 25 characters'],
        required: [true, 'name is required']
    },
    //email
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        //validate: [validator.isEmail, 'valid email is required']
    },
    //photo
    photo: String,
    //password
    password: {
        type: String,
        trim: true,
        minLength: [8, 'password must be at least 8 characters long'],
        //maxLength: [16, 'password cannot be more than 16 characters long'],
        required: [true, 'password is required'],
        
    },
    //passwordConfirm
    passwordConfirm: {
        type: String,
        trim: true,
        minLength: [8, 'password must be at least 8 characters long'],
        //maxLength: [16, 'password cannot be more than 16 characters long'],
        required: true,
        validate: {
            validator: function(el) {
                return el === this.password; //'this' will only work on create() and save()! This means whenever we want to update a user, we will have to use create/save() as well
            },
            message: 'Passwords are not the same'
        }
    }
});

//only run this function if password was actually modified 
//pre hooks - happens in the moment between receiving the data and saving the data to the db (persisted)
climberSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    } else {
        //popular hashing algorithm - async version
        this.password = await bcrypt.hash(this.password, 12);
        //delete passwordConfirm fields
        this.passwordConfirm = undefined; 
    }
});

climberSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const Climber = mongoose.model('Climber', climberSchema);

module.exports = Climber;