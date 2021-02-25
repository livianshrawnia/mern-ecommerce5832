const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const { BrandSchemaFormation } = require('./formation/brand');
const Product = require('./product');

// Brand Schema
const BrandSchema = new Schema(BrandSchemaFormation,{
    timestamps: true
});

BrandSchema.post('findOneAndUpdate', function(prevDoc) {
    const updatedDoc = this._update.$set;
     if (prevDoc.name !== updatedDoc.name) {
      Product.updateMany({'brand._id' : prevDoc._id}, {'brand.name' : updatedDoc.name}).exec();
    }
  });

module.exports = Mongoose.model('Brand', BrandSchema);
