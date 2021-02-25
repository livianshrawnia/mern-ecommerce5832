const { httpErrorCode, httpStatusCode } = require("../../constant");

exports.getHttpStatusCode = (jsonCode) => {
    let status;
    switch(jsonCode){
        case httpErrorCode.SUCCESS : status = httpStatusCode.OK; break;
        case httpErrorCode.USER_ERROR : status = httpStatusCode.BAD_REQUEST; break;
        case httpErrorCode.SERVER_ERROR : status = httpStatusCode.INTERNAL_SERVER_ERROR; break;
        default : status = httpStatusCode.NOT_FOUND;
    }
    return status;
}