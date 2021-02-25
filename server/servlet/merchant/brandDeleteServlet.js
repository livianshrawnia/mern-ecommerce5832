const brandService = require('../../services/merchant/brandService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.brandDeleteServlet = async (req, res) => {
  const user = req.user._id;
  const brandId = string(req.params.brandId);
  const json = await brandService.delete(user, brandId);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }