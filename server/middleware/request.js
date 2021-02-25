const MaskData = require("maskdata");
const { logger } = require("../config/logger");

// Mask critical request params
const maskRequestBodyParams = (bodyObject) =>{
  const maskParams = ['password','confirmPassword'];
  for (const key in bodyObject) {
    if(maskParams.includes(key)){
      bodyObject[key] = MaskData.maskPassword(bodyObject[key]);
    }
  }
  return bodyObject;
}

const request = async (req, res, next) => {
  const { rawHeaders, httpVersion, method, body, socket, url } = req;
  const { remoteAddress, remoteFamily } = socket;
  const duplicateBody = Object.assign({}, body);
  const filteredbody = await maskRequestBodyParams(duplicateBody);

  logger.info(JSON.stringify({
    timestamp: Date.now(),
    rawHeaders,
    httpVersion,
    method,
    filteredbody,
    remoteAddress,
    remoteFamily,
    url
  }));
  next();
  }

module.exports = request;
