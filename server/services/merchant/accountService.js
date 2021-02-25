const User = require('../../models/user');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');
const accountService = require('../../services/website/accountService');
const role = require('../../middleware/role');
const { merchantStatus } = require('../../../constant');

/**
 *
 * @author LIVIAN
 */

exports.list = async () => {
  let json = {};
  json.result = {};
    try{ 

      const result = await User.find({ merchant : { $exists : true } }).sort({_id : -1});

      json.result.merchants = result;
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
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} email 
 * @param {*} mobileNumber 
 * @param {*} brand 
 * @param {*} business 
 */
exports.signup = async (firstName, lastName, email, mobileNumber, brand, business) => {
  logger.info(`accountService::signup`);
  
  let json = {};
  json.result = {};

    try{   
      if (validator.isEmpty(email)) {
        json.error = true;
        json.message = 'You must enter a email.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isEmail(email)) {
        json.error = true;
        json.message = 'You must enter a valid email.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }  
      if (validator.isEmpty(mobileNumber)) {
        json.error = true;
        json.message = 'You must enter a mobile number.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(mobileNumber, {min : 10})) {
        json.error = true;
        json.message = 'Please enter valid mobile number.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(brand)) {
        json.error = true;
        json.message = 'You must enter a brand name.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(brand, {min : 3})) {
        json.error = true;
        json.message = 'Brand name must be at least 3 characters.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(business)) {
        json.error = true;
        json.message = 'You must enter a business description.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(business, {min : 10})) {
        json.error = true;
        json.message = 'Business description must be at least 10 characters.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }     

        const password = email;
        const isSubscribed = false;
        const accountSignup = await accountService.signup(email, firstName, lastName, password, isSubscribed);
        if(accountSignup.error && accountSignup.message !== 'Email address already exists.'){
          return accountSignup;
        }

        const user = await User.findOne({email});
        if (user.role === role.ROLES.Merchant || user.role === role.ROLES.Admin) {
          json.error = true;
          json.message = `You already have merchant role.`;
          logger.error(JSON.stringify(json.message));
          json.code = httpErrorCode.USER_ERROR;
          return json;
        }

      const merchantPayload = {
        role : role.ROLES.Merchant,
        mobileNumber,
        merchant : {
          brand,
          business,
          status : merchantStatus.WAITING_APPROVAL
        }
      }
      const merchant = await User.findOneAndUpdate({email}, merchantPayload, { new : true});
      if(!merchant){
        json.error = true;
        json.message = 'Merchant not created.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
      } 

      json.result.user = merchant;
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