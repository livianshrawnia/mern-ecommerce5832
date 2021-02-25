const categoryService = require('../../services/website/categoryService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');

exports.categoryListServlet = async (req, res) => {
  logger.info('::categoryListServlet');
    const json = await categoryService.list();    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }