const categoryService = require('../../services/merchant/categoryService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');
const { logger } = require('../../config/logger');

exports.categoryEditServlet = async (req, res) => {
  logger.info(`::categoryEditServlet`);
  const { body } = req;
  const categoryId = string(req.params.categoryId);
  logger.info(`categoryId : ${categoryId}`);
  const user = req.user._id;
  logger.info(`user : ${user}`);
  const name = string(body.name);
  logger.info(`name : ${name}`);
  const description = string(body.description);
  logger.info(`description : ${description}`);
  const json = await categoryService.edit(user, categoryId, name, description);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }