const accountService = require('../../services/website/accountService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');
const { logger } = require('../../config/logger');

exports.accountProfileGetServlet = async (req, res) => {
  logger.info(`::accountProfileGetServlet`);
  const { body } = req;
  const user = req.user._id;
  logger.info(`user : ${user}`);
  const json = await accountService.get(user);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }