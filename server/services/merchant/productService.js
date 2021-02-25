const Product = require('../../models/product');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');
const brandService = require('./brandService');
const categoryService = require('./categoryService');
const { logger } = require('../../config/logger');

/**
 *
 * @author LIVIAN
 */


 /**
 * 
 * @param {*} user 
 */
exports.list = async (user) => {
  let json = {};
  json.result = {};  
  
    try{ 
      const query = {user};
      const projection = {
        sku : 1,
        name: 1, 
        description: 1, 
        quantity : 1, 
        price : 1,
        brand : {
          name : 1
        }
      };
      const result = await Product.find(query, projection).sort({_id : -1});

      if(!result){
        json.result.products = [];
        json.error = false;
        json.message = 'Success.';
        json.code = httpErrorCode.SUCCESS;
        return json;
      }

      json.result.products = result;
      json.error = false;
      json.message = 'Success.';
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}

/**
 * 
 * @param {*} user 
 * @param {*} sku 
 * @param {*} name 
 * @param {*} description 
 * @param {*} quantity 
 * @param {*} price 
 * @param {*} taxable 
 * @param {*} brandId 
 * @param {*} categoryIds 
 */
exports.add = async (user, sku, name, description, quantity, price, taxable, brandId, categoryIds) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (validator.isEmpty(sku)) {
        json.error = true;
        json.message = 'You must enter a product sku.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(sku, {min : 6})) {
        json.error = true;
        json.message = 'Product sku must be at least 6 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(name)) {
        json.error = true;
        json.message = 'You must enter a product name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(name, {min : 3})) {
        json.error = true;
        json.message = 'Product name must be at least 3 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(description)) {
        json.error = true;
        json.message = 'You must enter a product description.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(description, {min : 10, max : 100})) {
        json.error = true;
        json.message = 'Product description must be between 10 to 100 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (quantity < 1 || quantity > 100) {
        json.error = true;
        json.message = 'Product quantity must be number and between 1 to 100.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (price < 1) {
        json.error = true;
        json.message = 'Product price must be valid currency.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isMongoId(brandId)) {
        json.error = true;
        json.message = 'Invalid brandId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const brandJson = await brandService.getBrandById(brandId);
      if (brandJson.error) {
        return brandJson;
      }
      if (categoryIds.length === 0) {
        json.error = true;
        json.message = 'Empty category id\'s.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const categoryDocArray = [];
      for (const categoryId of categoryIds) {        
        if (!validator.isMongoId(categoryId)) {
          json.error = true;
          json.message = 'Invalid categoryId.';
          json.code = httpErrorCode.USER_ERROR;
          return json;
        }
        const categoryJson = await categoryService.getCategoryById(categoryId);
        if (categoryJson.error) {
          return categoryJson;
        }
        const categorySingleDoc = {
          _id : categoryJson.result.category._id,
          name : categoryJson.result.category.name,
          slug : categoryJson.result.category.slug
        }
        categoryDocArray.push(categorySingleDoc)
      }

      const product = new Product({
        sku,
        name,
        description,
        quantity,
        price,
        taxable,
        brand : {
          _id : brandJson.result.brand._id,
          name : brandJson.result.brand.name,
          slug : brandJson.result.brand.slug
        },
        categories : categoryDocArray,
        user
      });

      const result = await product.save();

      json.result.product = result;
      json.error = false;
      json.message = 'Success.';
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}

/**
 * 
 * @param {*} user 
 * @param {*} productId 
 * @param {*} sku 
 * @param {*} name 
 * @param {*} description 
 * @param {*} quantity 
 * @param {*} price 
 * @param {*} taxable 
 * @param {*} brandId 
 * @param {*} categoryIds 
 */
exports.edit = async (user, productId, sku, name, description, quantity, price, taxable, brandId, categoryIds) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isMongoId(productId)) {
        json.error = true;
        json.message = 'Invalid productId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(sku)) {
        json.error = true;
        json.message = 'You must enter a product sku.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(sku, {min : 6})) {
        json.error = true;
        json.message = 'Product sku must be at least 6 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(name)) {
        json.error = true;
        json.message = 'You must enter a product name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(name, {min : 3})) {
        json.error = true;
        json.message = 'Product name must be at least 3 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(description)) {
        json.error = true;
        json.message = 'You must enter a product description.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(description, {min : 10, max : 100})) {
        json.error = true;
        json.message = 'Product description must be between 10 to 100 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (quantity < 1 || quantity > 100) {
        json.error = true;
        json.message = 'Product quantity must be number and between 1 to 100.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (price < 1) {
        json.error = true;
        json.message = 'Product price must be valid currency.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isMongoId(brandId)) {
        json.error = true;
        json.message = 'Invalid brandId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const brandJson = await brandService.getBrandById(brandId);
      if (brandJson.error) {
        return brandJson;
      }
      if (categoryIds.length === 0) {
        json.error = true;
        json.message = 'Empty category id\'s.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const categoryDocArray = [];
      for (const categoryId of categoryIds) {        
        if (!validator.isMongoId(categoryId)) {
          json.error = true;
          json.message = 'Invalid categoryId.';
          json.code = httpErrorCode.USER_ERROR;
          return json;
        }
        const categoryJson = await categoryService.getCategoryById(categoryId);
        if (categoryJson.error) {
          return categoryJson;
        }
        const categorySingleDoc = {
          _id : categoryJson.result.category._id,
          name : categoryJson.result.category.name,
          slug : categoryJson.result.category.slug
        }
        categoryDocArray.push(categorySingleDoc)
      }

      const result = await Product.findOneAndUpdate({
        user,
        _id : productId
      },{
        sku,
        name,
        description,
        quantity,
        price,
        taxable,
        brand : {
          _id : brandJson.result.brand._id,
          name : brandJson.result.brand.name,
          slug : brandJson.result.brand.slug
        },
        categories : categoryDocArray
      });

      if (!result) {
        json.error = true;
        json.message = 'Invalid productId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      json.result.product = result;
      json.error = false;
      json.message = 'Success.';
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}

/**
 * 
 * @param {*} user 
 * @param {*} productId 
 */
exports.delete = async (user, productId) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isMongoId(productId)) {
        json.error = true;
        json.message = 'Invalid productId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      
      const result = await Product.findOneAndDelete({user, _id: productId});

      if(result){
        json.error = false;
        json.message = 'Success.';
        json.code = httpErrorCode.SUCCESS;
        return json;
      }
      json.error = true;
      json.message = 'Invalid productId.';
      json.code = httpErrorCode.USER_ERROR;
      return json; 

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}