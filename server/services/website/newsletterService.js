const mailgun = require('../mailgun');
const mailchimp = require('../mailchimp');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');

/**
 *
 * @author LIVIAN
 */

/**
 * 
 * @param {*} email 
 */
exports.subscribe = async (email) => {
  logger.info(`newsletterService::subscribe`);
  
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
      
      const result = await mailchimp.subscribeToNewsletter(email); 
      if(result.status === 400 || result.status === undefined){
        json.error = true;
        json.message = result.message;
        logger.emerg(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;      
      }

      mailgun.sendEmail(email, 'newsletter-subscription').then(()=>{
        logger.info(`Newsletter subscription email sent on ${email} successfully!!!`);
      },()=>{
        logger.emerg('Newsletter subscription email not sent.');
      });

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