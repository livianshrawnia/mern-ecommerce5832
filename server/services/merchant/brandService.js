const Brand = require('../../models/brand');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');

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
      const projection = {name: 1, description: 1, slug : 1, isActive : 1};
      const result = await Brand.find(query, projection).sort({_id : -1});

      if (!result) {
        json.result.brands = [];
        json.error = false;
        json.message = 'Success.';
        json.code = httpErrorCode.SUCCESS;
        return json;
      }

      json.result.brands = result;
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
 * @param {*} name 
 * @param {*} description 
 */
exports.add = async (user, name, description) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (validator.isEmpty(name)) {
        json.error = true;
        json.message = 'You must enter a brand name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(name, {min : 3})) {
        json.error = true;
        json.message = 'Brand name must be at least 3 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(description)) {
        json.error = true;
        json.message = 'You must enter a brand description.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(description, {min : 10, max : 100})) {
        json.error = true;
        json.message = 'Brand description must be between 10 to 100 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const brand = new Brand({
        name,
        description,
        user
      });

      const result = await brand.save();

      json.result.brand = result;
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
 * @param {*} brandId 
 * @param {*} name 
 * @param {*} description 
 */
exports.edit = async (user, brandId, name, description) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isMongoId(brandId)) {
        json.error = true;
        json.message = 'Invalid brandId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(name)) {
        json.error = true;
        json.message = 'You must enter a brand name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(name, {min : 3})) {
        json.error = true;
        json.message = 'Brand name must be at least 3 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(description)) {
        json.error = true;
        json.message = 'You must enter a brand description.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(description, {min : 10, max : 100})) {
        json.error = true;
        json.message = 'Brand description must be between 10 to 100 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const findResult = await Brand.findOne({user, _id: brandId});
      if(!findResult){
        json.error = true;
        json.message = 'Invalid brandId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;      
      }
      const result = await Brand.findOneAndUpdate(
        {user, _id: brandId}, 
        {
          name,
          description
        });
      json.result.brand = result;
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
 * @param {*} brandId 
 */
exports.delete = async (user, brandId) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isMongoId(brandId)) {
        json.error = true;
        json.message = 'Invalid brandId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      
      const result = await Brand.findOneAndDelete({user, _id: brandId});

      if(!result){
        json.error = true;
        json.message = 'Invalid brandId.';
        json.code = httpErrorCode.USER_ERROR;
        return json; 
      }
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
 * @param {*} brandId 
 */
exports.getBrandById = async (brandId) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isMongoId(brandId)) {
        json.error = true;
        json.message = 'Invalid brandId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      
      const result = await Brand.findById(brandId);

      if(!result){
        json.error = true;
        json.message = 'Invalid brandId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;         
      }

      json.result.brand = result;
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