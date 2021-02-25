const newsletterService = require('../../services/website/newsletterService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');
const { logger } = require('../../config/logger');

exports.newsletterSubscribeServlet = async (req, res) => {
    logger.info('::newsletterSubscribeServlet');
    const { body } = req;
    const email = string(body.email);
    logger.info(`email : ${email}`);
    const json = await newsletterService.subscribe(email);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }