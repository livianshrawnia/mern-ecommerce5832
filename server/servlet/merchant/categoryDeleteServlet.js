const categoryService = require('../../services/merchant/categoryService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');
const { logger } = require('../../config/logger');

exports.categoryDeleteServlet = async (req, res) => {
  logger.info(`::categoryDeleteServlet`);
  const user = req.user._id;
  logger.info(`user : ${user}`);
  const categoryId = string(req.params.categoryId);
  logger.info(`categoryId : ${categoryId}`);
  const json = await categoryService.delete(user, categoryId);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }