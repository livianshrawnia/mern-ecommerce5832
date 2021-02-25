const categoryService = require('../../services/merchant/categoryService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');

exports.categoryListServlet = async (req, res) => {
  logger.info('::categoryListServlet')
  const user = req.user._id;
    const json = await categoryService.list(user);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }