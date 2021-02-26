const Category = require('../../models/category');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');

/**
 *
 * @author LIVIAN
 */

exports.list = async () => {
  let json = {};
  json.result = {};
  
    try{ 
      const query = {};
      const projection = {name: 1, description: 1}; // {name: 1, description: 1}
      const result = await Category.find(query, projection).sort({_id : -1});

      if(!result){
        json.result.categories = [];
        json.error = false;
        json.message = 'Success.';
        json.code = httpErrorCode.SUCCESS;
        return json;
      }

      json.result.categories = result;
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
        json.message = 'You must enter a category name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(name, {min : 3})) {
        json.error = true;
        json.message = 'Category name must be at least 3 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const findCategory = await Category.findOne({ name });
      if (findCategory) {
        json.error = true;
        json.message = 'Category already exist.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(description)) {
        json.error = true;
        json.message = 'You must enter a category description.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(description, {min : 10, max : 100})) {
        json.error = true;
        json.message = 'Category description must be between 10 to 100 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const category = new Category({
        name,
        description,
        createdBy : user
      });

      const result = await category.save();

      json.result.category = result;
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
 * @param {*} categoryId 
 * @param {*} name 
 * @param {*} description 
 */
exports.edit = async (user, categoryId, name, description) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isMongoId(categoryId)) {
        json.error = true;
        json.message = 'Invalid categoryId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(name)) {
        json.error = true;
        json.message = 'You must enter a category name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const findCategory = await Category.findOne({ name });
      if (findCategory && findCategory.id !== categoryId) {
        json.error = true;
        json.message = 'Category already exist.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(name, {min : 3})) {
        json.error = true;
        json.message = 'Category name must be at least 3 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(description)) {
        json.error = true;
        json.message = 'You must enter a category description.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(description, {min : 10, max : 100})) {
        json.error = true;
        json.message = 'Category description must be between 10 to 100 characters.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const result = await Category.findOneAndUpdate(
        {_id: categoryId}, 
        {
          name,
          description,
          updatedBy : user
        });

      if(!result){
        json.error = true;
        json.message = 'Invalid categoryId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;          
      }
      
      json.result.category = result;
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
 * @param {*} categoryId 
 */
exports.delete = async (categoryId) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isMongoId(categoryId)) {
        json.error = true;
        json.message = 'Invalid categoryId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      
      const result = await Category.findOneAndDelete({_id: categoryId});

      if(!result){
        json.error = true;
        json.message = 'Invalid categoryId.';
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
 * @param {*} categoryId 
 */
exports.getCategoryById = async (categoryId) => {
  logger.info(`categoryService::getCategoryById`);

  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isMongoId(categoryId)) {
        json.error = true;
        json.message = 'Invalid categoryId.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      
      logger.info(`Category.findById(${categoryId})`);
      const result = await Category.findById(categoryId);
      logger.info(`hasResult : ${Boolean(result)}`);

      if(!result){
        json.error = true;
        json.message = 'Invalid categoryId.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;         
      }

      json.result.category = result;
      json.error = false;
      json.message = 'Success.';
      logger.info(JSON.stringify(json.message));
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        logger.emerg(`Server Error : ${JSON.stringify(json.message)}`);
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}