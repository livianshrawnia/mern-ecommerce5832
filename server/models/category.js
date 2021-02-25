const Mongoose = require('mongoose');
const { CategorySchemaFormation } = require('./formation/category');
const { Schema } = Mongoose;
const Product = require('./product');

// Category Schema
const CategorySchema = new Schema(CategorySchemaFormation,{
  timestamps: true
});

CategorySchema.post('findOneAndUpdate', function(prevDoc) {
  const updatedDoc = this._update.$set;
   if (prevDoc.name !== updatedDoc.name) {
    Product.updateMany({'categories._id' : prevDoc._id}, {'categories.$.name' : updatedDoc.name}).exec();
  }
});

module.exports = Mongoose.model('Category', CategorySchema);
