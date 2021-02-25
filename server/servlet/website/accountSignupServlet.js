const accountService = require('../../services/website/accountService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const MaskData = require('maskdata');
const { boolean, string } = require('../../helpers/dataType');
const { logger } = require('../../config/logger');

exports.accountSignupServlet = async (req, res) => {
    logger.info('::accountSignupServlet');
    const { body } = req;
    const email = string(body.email);
    logger.info(`email : ${email}`);
    const firstName = string(body.firstName);
    logger.info(`firstName : ${firstName}`);    
    const lastName = string(body.lastName);
    logger.info(`lastName : ${lastName}`);    
    const password = string(body.password);
    logger.info(`password : ${MaskData.maskPassword(password)}`);    
    const isSubscribed = boolean(body.isSubscribed);
    logger.info(`isSubscribed : ${isSubscribed}`);
    const json = await accountService.signup(email, firstName, lastName, password, isSubscribed);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }