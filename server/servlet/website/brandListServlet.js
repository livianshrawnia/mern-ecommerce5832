const brandService = require('../../services/website/brandService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');

exports.brandListServlet = async (req, res) => {
  logger.info('::brandListServlet');
    const json = await brandService.list();    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }