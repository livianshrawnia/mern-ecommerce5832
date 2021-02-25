const { merchantStatus } = require("../../constant");

module.exports.findMerchantStatus = (input) => {
    const merStatusArray = Object.values(merchantStatus);
    const result = merStatusArray.includes( input);
    return result;
}