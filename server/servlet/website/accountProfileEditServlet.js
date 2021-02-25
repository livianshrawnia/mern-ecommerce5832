const accountService = require('../../services/website/accountService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');
const { logger } = require('../../config/logger');

exports.accountProfileEditServlet = async (req, res) => {
  logger.info(`::accountProfileEditServlet`);
  const { body } = req;
  const user = req.user._id;
  logger.info(`user : ${user}`);
  const firstName = string(body.firstName);
  logger.info(`firstName : ${firstName}`);
  const lastName = string(body.lastName);
  logger.info(`lastName : ${lastName}`);
  const json = await accountService.edit(user, firstName, lastName);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }