const Product = require('../../models/product');
const Brand = require('../../models/brand');
const Category = require('../../models/category');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');

/**
 *
 * @author LIVIAN
 */


 /**
 * 
 * @param {*} brandSlug 
 * @param {*} categorySlug 
 */
exports.list = async (brandSlug, categorySlug) => {
  let json = {};
  json.result = {};
  let query = {};  

    if(!validator.isEmpty(brandSlug)){
      const brand = await Brand.findOne({slug : brandSlug});
      if (!brand) {
        json.error = true;
        json.message = 'Invalid brand slug.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      query = { 'brand.slug' : brandSlug };
    }
    if(validator.isEmpty(brandSlug) && !validator.isEmpty(categorySlug)){
      const category = await Category.findOne({slug : categorySlug});
      if (!category) {
        json.error = true;
        json.message = 'Invalid category slug.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      query = { 'categories.slug' : categorySlug };
    }
  
    try{ 
      const projection = {
        sku : 1,
        name: 1, 
        slug: 1, 
        description: 1, 
        quantity : 1, 
        price : 1,
        brand : 1,
        categories : 1
      };
      const result = await Product.find(query, projection).sort({_id : -1});

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
 * @param {*} productSlug 
 */
exports.get = async (productSlug) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (validator.isEmpty(productSlug)) {
        json.error = true;
        json.message = 'Empty productSlug.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      
      const result = await Product.findOne({slug: productSlug});
      if(!result){
        json.error = true;
        json.message = 'No product found.';
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