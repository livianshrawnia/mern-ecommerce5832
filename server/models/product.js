const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const { ProductSchemaFormation } = require('./formation/product');

// Product Schema
const ProductSchema = new Schema(ProductSchemaFormation,{
  timestamps: true
});

module.exports = Mongoose.model('Product', ProductSchema);
