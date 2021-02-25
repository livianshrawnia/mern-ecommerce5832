const categoryService = require('../../services/interface/categoryService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.categoryAddServlet = async (req, res) => {
  const { body } = req;
  const user = req.user._id;
  const name = string(body.name);
  const description = string(body.description);
    const json = await categoryService.add(user, name, description);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }