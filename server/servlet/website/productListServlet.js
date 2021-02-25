const productService = require('../../services/website/productService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.productListServlet = async (req, res) => {
  
  const { body } = req;
  const brandSlug = string(body.brandSlug);
  const categorySlug = string(body.categorySlug);
  const json = await productService.list(brandSlug, categorySlug);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }