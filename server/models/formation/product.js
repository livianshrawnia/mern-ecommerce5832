const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;
const { BrandSchemaFormation } = require('./brand');
const { CategorySchemaFormation } = require('./category');

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);

// Product Schema Formation
module.exports.ProductSchemaFormation = {
  sku: {
    type: String,
    required : true,
    minlength : 6,
    trim: true
  },
  name: {
    type: String,
    required : true,
    minlength : 3,
    trim: true
  },
  slug: { 
    type: String, 
    slug: 'name', 
    unique: true 
  },
  imageUrl: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required : true,
    minlength : 10,
    maxlength : 100,
    trim: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  taxable: {
    type: Boolean,
    required: true,
    default: false
  },
  brand : {
    _id : { type: Schema.Types.ObjectId, ref: 'Brand'},
    name: {
      type: String,
      trim: true
    }
  },
  categories : [
    {
      _id : { type: Schema.Types.ObjectId, ref: 'Category'},
      name: {
        type: String,
        trim: true
      }
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  },
  user : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  createdBy : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  updatedBy : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
};