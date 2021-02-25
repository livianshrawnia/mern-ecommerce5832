const mailgun = require('../mailgun');
const Contact = require('../../models/contact');
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
 * @param {*} name 
 * @param {*} message 
 */
exports.add = async (email, name, message) => {
  logger.info(`contactService::add`);
  
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
      if (validator.isEmpty(name)) {
        json.error = true;
        json.message = 'You must enter a name.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(name, {min : 3})) {
        json.error = true;
        json.message = 'Name must be at least 3 characters long.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(message)) {
        json.error = true;
        json.message = 'You must enter a message.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(message, {min : 10})) {
        json.error = true;
        json.message = 'Message must be at least 10 characters long.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      
      const contact = new Contact({
        email,
        name,
        message
      });    
      logger.info(`contact : ${JSON.stringify(contact)}`);      
      logger.info(`contact.save()`);
      const result = await contact.save();
      logger.info(`hasResult : ${Boolean(result)}`);
      if(!result){
        json.error = true;
        json.message = 'Error saving contact.';
        logger.emerg(JSON.stringify(json.message));
        json.code = httpErrorCode.SERVER_ERROR;
        return json;      
      }

      mailgun.sendEmail(result.email, 'contact').then(()=>{
        logger.info(`Contact email sent on ${result.email} successfully!!!`);
      },()=>{
        logger.emerg('Contact email not sent.');
      });

      json.result.contact = result;
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