const accountService = require('../../services/merchant/accountService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { string } = require('../../helpers/dataType');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');


exports.accountSignupServlet = async (req, res) => {
    logger.info(`::accountSignupServlet`);
   
    const { body } = req;
    const firstName = string(body.firstName);
    logger.info(`firstName : ${firstName}`);
    const lastName = string(body.lastName);
    logger.info(`lastName : ${lastName}`);
    const email = string(body.email);
    logger.info(`email : ${email}`);
    const mobileNumber = string(body.mobileNumber);
    logger.info(`mobileNumber : ${mobileNumber}`);
    const brand = string(body.brand);
    logger.info(`brand : ${brand}`);
    const business = string(body.business);
    logger.info(`business : ${business}`);
    const json = await accountService.signup(firstName, lastName, email, mobileNumber, brand, business);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }