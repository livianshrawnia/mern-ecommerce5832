const accountService = require('../../services/interface/accountService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');

exports.accountActionServlet = async (req, res) => {
    const userId = req.params.userId;
    const status = req.body.status;
    const json = await accountService.action(userId, status);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }