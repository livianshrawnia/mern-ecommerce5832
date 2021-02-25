const accountService = require('../../services/website/accountService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');
const { logger } = require('../../config/logger');
const MaskData = require('maskdata');

exports.accountPasswordSetServlet = async (req, res) => {
  logger.info(`::accountPasswordSetServlet`);
  const { body } = req;
  let email, resetPasswordToken, setByEmail = true;
  try {
    email = req.user.email;
    logger.info(`email : ${email}`);
  } catch (error) {
    resetPasswordToken = string(req.params.resetPasswordToken);
    logger.info(`resetPasswordToken : ${resetPasswordToken}`);
    setByEmail = false;
  }  
  const password = string(body.password);
  logger.info(`password : ${MaskData.maskPassword(password)}`);
  const confirmPassword = string(body.confirmPassword);
  logger.info(`confirmPassword : ${MaskData.maskPassword(confirmPassword)}`);
  logger.info(`setByEmail : ${setByEmail}`);
  const json = await accountService.passwordSet(email, resetPasswordToken, password, confirmPassword, setByEmail);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }