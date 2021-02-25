const orderService = require('../../services/website/orderService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');

exports.orderGetServlet = async (req, res) => {
   
  const user = req.user._id;
  const orderId = req.params.orderId;
    const json = await orderService.get(user, orderId);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }