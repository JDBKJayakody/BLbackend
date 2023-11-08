
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');


var userSchema = mongoose.Schema({
    name: {
        type: String,
        max: 30,
        min: 2
    },
    
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        max: 50,
        min: 5
    },
    phone: {
        type: String,
        default:''
    },
    address: {
        type: String,
        default:''
    },
    password: {
        type: String,
        min: 6,
    },
    token: { type: String, default: '' },

    usertype: {
        type: String,
        default: 'user'
    },
    is_deleted:{
        type:Boolean,
        default:false,
    },


    created: {
        type: Number,
        default: Date.now
    },

});
userSchema.plugin(uniqueValidator);
var userSchemaModel = mongoose.model('users', userSchema);

module.exports = {
    userSchemaModel,
}