const orderService = require('../../services/website/orderService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');

exports.orderItemCancelServlet = async (req, res) => {
   
  const user = req.user._id;
  const orderItemId = req.params.orderItemId;
    const json = await orderService.itemCancel(user, orderItemId);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }