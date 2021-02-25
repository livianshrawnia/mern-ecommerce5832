const Category = require('../../models/category');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');

/**
 *
 * @author LIVIAN
 */

exports.list = async () => {
  logger.info(`categoryService::list`);

  let json = {};
  json.result = {};
  
    try{ 
      const query = {};
      const projection = {name : 1, description : 1, slug : 1};
      logger.info(`Category.find(${JSON.stringify(query)}, ${JSON.stringify(projection)}).sort({_id : -1})`);
      const result = await Category.find(query, projection).sort({_id : -1});      
      logger.info(`hasResult : ${Boolean(result)}`);

      if(!result){
        json.result.categories = [];
        json.error = false;
        json.message = 'Success.';
        logger.info(JSON.stringify(json.message));
        json.code = httpErrorCode.SUCCESS;
        return json;
      }

      json.result.categories = result;
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
