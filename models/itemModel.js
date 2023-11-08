
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');


var itemSchema = mongoose.Schema({
    name: {
        type: String,
        max: 30,
        min: 2
    },
    
    description: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    is_deleted:{
        type:Boolean,
        default:false,
    },
    quantity:{
        type:Number
    },
    created: {
        type: Number,
        default: Date.now
    },

});
itemSchema.plugin(uniqueValidator);
var itemSchemaModel = mongoose.model('item', itemSchema);

module.exports = {
    itemSchemaModel,
}