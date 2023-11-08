var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const Joi = require("joi");

var orderItemSchema = mongoose.Schema({
  item_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "item",
  },
  name: {
    type: String,
    min: 1,
  },
  order_from_date: {
    type: Date,
  },
  order_to_date: {
    type: Date,
  },
});

var orderSchema = mongoose.Schema({
  customer_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "customer",
  },
  customer_name: {
    type: String,
    min: 1,
  },
  total: {
    type: String,
    min: 1,
  },
  items: [orderItemSchema],
  status: {
    type: String,
    default: "pending",
  },

  created: {
    type: Number,
    default: Date.now,
  },
});

orderSchema.plugin(uniqueValidator);
var orderSchemaModel = mongoose.model("order", orderSchema);

module.exports = {
  orderSchemaModel,
};
