const categoryService = require('../../services/interface/categoryService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.categoryEditServlet = async (req, res) => {
  const { body } = req;
  const user = req.user._id;
  const categoryId = string(req.params.categoryId);
  const name = string(body.name);
  const description = string(body.description);
    const json = await categoryService.edit(user, categoryId, name, description);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }