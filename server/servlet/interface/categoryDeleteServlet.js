const categoryService = require('../../services/interface/categoryService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.categoryDeleteServlet = async (req, res) => {
  const categoryId = string(req.params.categoryId);
    const json = await categoryService.delete(categoryId);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }