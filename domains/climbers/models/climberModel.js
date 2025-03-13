const mongoose = require('mongoose');
//const validator = require('validator');

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
        required: true
    }
});

const Climber = mongoose.model('Climber', climberSchema);

module.exports = Climber;