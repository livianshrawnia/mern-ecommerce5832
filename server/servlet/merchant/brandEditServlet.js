const brandService = require('../../services/merchant/brandService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.brandEditServlet = async (req, res) => {
  const { body } = req;
  const brandId = string(req.params.brandId);
  const user = req.user._id;
  const name = string(body.name);
  const description = string(body.description);
  const json = await brandService.edit(user, brandId, name, description);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }