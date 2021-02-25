const productService = require('../../services/merchant/productService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string, integer, decimal, boolean, array } = require('../../helpers/dataType');

exports.productAddServlet = async (req, res) => {
  const { body } = req;
  const user = req.user._id;
  const sku = string(body.sku);
  const name = string(body.name);
  const description = string(body.description);
  const quantity = integer(body.quantity);
  const price = decimal(body.price);
  const taxable = boolean(body.taxable);
  const brandId = string(body.brand);
  const categoryIds = array(body.categories);
  const json = await productService.add(user, sku, name, description, quantity, price, taxable, brandId, categoryIds);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }