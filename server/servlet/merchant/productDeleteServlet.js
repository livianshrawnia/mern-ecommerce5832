const productService = require('../../services/merchant/productService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.productDeleteServlet = async (req, res) => {
  const productId = string(req.params.productId);
  const user = req.user._id;
  const json = await productService.delete(user, productId);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }