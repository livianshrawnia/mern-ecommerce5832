const orderService = require('../../services/website/orderService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');

exports.orderCancelServlet = async (req, res) => {
   
  const user = req.user._id;
  const orderId = req.params.orderId;
    const json = await orderService.cancel(user, orderId);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }