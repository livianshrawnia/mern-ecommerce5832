const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);

// Category Schema Formation
module.exports.CategorySchemaFormation = {
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
  description: {
    type: String,
    required : true,
    minlength : 10,
    maxlength : 100,
    trim: true
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
