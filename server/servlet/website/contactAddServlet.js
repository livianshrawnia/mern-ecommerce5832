const contactService = require('../../services/website/contactService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');
const { logger } = require('../../config/logger');

exports.contactAddServlet = async (req, res) => {
    logger.info('::contactAddServlet');
    const { body } = req;
    const email = string(body.email);
    logger.info(`email : ${email}`);
    const name = string(body.name);
    logger.info(`name : ${name}`);    
    const message = string(body.message);
    logger.info(`message : ${message}`); 
    const json = await contactService.add(email, name, message);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }