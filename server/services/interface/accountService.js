const User = require('../../models/user');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');
const { findMerchantStatus } = require('../../helpers/merchant');

/**
 *
 * @author LIVIAN
 */

exports.list = async () => {
  let json = {};
  json.result = {};
    try{ 

      const result = await User.find({ merchant : { $exists : false } }).sort({_id : -1});

      json.result.users = result;
      json.error = false;
      json.message = 'Success.';
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}


/**
 * 
 * @param {*} userId 
 * @param {*} status 
 */
exports.action = async (userId, status) => {
  logger.info(`accountService::action`);
  
  let json = {};
  json.result = {};

    try{   
      if (!validator.isMongoId(userId)) {
        json.error = true;
        json.message = 'Invalid user.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const user = await User.findOne({_id : userId});
      if (!user) {
        json.error = true;
        json.message = 'Invalid user.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(status)) {
        json.error = true;
        json.message = 'You must enter a status.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const merStatus = await findMerchantStatus(status);
      if (!merStatus) {
        json.error = true;
        json.message = 'Invalid status.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      user.merchant.status = status;
      const updatedUser = await User.findOneAndUpdate({_id: userId}, user, { new : true});
      if(!updatedUser){
        json.error = true;
        json.message = 'User not created.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
      } 

      json.result.user = updatedUser;
      json.error = false;
      json.message = `Success.`;
      logger.info(JSON.stringify(json.message));
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        logger.emerg(`Server Error : ${JSON.stringify(json.message)}`);
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}