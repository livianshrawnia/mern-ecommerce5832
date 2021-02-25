const Brand = require('../../models/brand');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');

/**
 *
 * @author LIVIAN
 */

exports.list = async () => {
  logger.info(`brandService::list`);

  let json = {};
  json.result = {};
  
    try{ 
      const query = {};
      const projection = {name : 1, description : 1, slug : 1};
      logger.info(`Brand.find(${JSON.stringify(query)}, ${JSON.stringify(projection)}).sort({_id : -1})`);
      const result = await Brand.find(query, projection).sort({_id : -1});      
      logger.info(`hasResult : ${Boolean(result)}`);

      if(!result){
        json.result.brands = [];
        json.error = false;
        json.message = 'Success.';
        logger.info(JSON.stringify(json.message));
        json.code = httpErrorCode.SUCCESS;
        return json;
      }

      json.result.brands = result;
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
