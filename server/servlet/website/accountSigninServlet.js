const accountService = require('../../services/website/accountService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const MaskData = require('maskdata');
const { boolean, string } = require('../../helpers/dataType');
const { logger } = require('../../config/logger');

exports.accountSigninServlet = async (req, res) => {
    logger.info('::accountSigninServlet');
    const { body } = req;
    const email = string(body.email);
    logger.info(`email : ${email}`);    
    const password = string(body.password);
    logger.info(`password : ${MaskData.maskPassword(password)}`);    
    const json = await accountService.signin(email, password);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }