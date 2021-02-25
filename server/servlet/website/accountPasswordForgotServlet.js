const accountService = require('../../services/website/accountService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');
const { logger } = require('../../config/logger');
const MaskData = require('maskdata');

exports.accountPasswordForgotServlet = async (req, res) => {
  logger.info(`::accountPasswordForgotServlet`);
  const { body } = req;
  const email = string(body.email);
  logger.info(`email : ${email}`);
  const json = await accountService.passwordForgot(email);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }