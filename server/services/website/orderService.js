const mailgun = require('../mailgun');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');
const Order = require('../../models/order');
const Cart = require('../../models/cart');
const taxConfig = require('../../config/tax');

/**
 *
 * @author LIVIAN
 */

/**
 * 
 * @param {*} user 
 */
exports.list = async (user) => {
  let json = {};
  json.result = {};
    try{ 
      const query = {user};
      const projection = {}; // {_id: 0, data: 1}
      const orderList = await Order.find(query, projection).sort({_id:-1}).populate({
        path: 'cart'
      });
  
      const newOrderList = orderList.filter(singleOrder => singleOrder.cart);
      const jsonOrderListArray = [];

      for(singleOrder of newOrderList){
        const cartId = singleOrder.cart._id;

        const cart = await Cart.findById(cartId).populate({
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        });

        const order = {
          _id: singleOrder._id,
          total: parseFloat(Number(singleOrder.total.toFixed(2))),
          created: singleOrder.created,
          products: cart.products
        };

        jsonOrderListArray.push(order);
      }

      json.result.orderList = jsonOrderListArray;
      json.error = false;
      json.message = 'Success.';
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}

/**
 * 
 * @param {*} user 
 * @param {*} orderId 
 */
exports.get = async (user, orderId) => {
  let json = {}; 
  json.result = {};
    try{ 

      if (validator.isEmpty(orderId) || orderId.length !== 24) {
         json.error = true;
         json.message = 'Invalid orderId.';
         json.code = httpErrorCode.USER_ERROR;
         return json;
      }

      const query = { _id : orderId, user};
      const projection = {}; // {_id: 0, data: 1}
      const order = await Order.findOne({_id: orderId, user }).populate({
        path: 'cart'
      });

      if(!order){
        json.error = true;
        json.message = `Cannot find order with the id: ${orderId}.`;
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const cart = await Cart.findById(order.cart._id).populate({
        path: 'products.product',
        populate: {
          path: 'brand'
        }
      });
  
      let jsonOrder = {
        _id: order._id,
        cartId: order.cart._id,
        total: order.total,
        totalTax: 0,
        created: cart.created,
        products: cart.products
      };
  
      jsonOrder = caculateTaxAmount(jsonOrder);

      json.result.order = jsonOrder;
      json.error = false;
      json.message = 'Success.';
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}

/**
 * 
 * @param {*} user 
 * @param {*} orderId 
 */
exports.cancel = async (user, orderId) => {
  let json = {}; 
  json.result = {};
    try{ 

      if (validator.isEmpty(validator.trim(orderId)) || orderId.length !== 24) {
         json.error = true;
         json.message = 'Invalid orderId.';
         json.code = httpErrorCode.USER_ERROR;
         return json;
      }

      const query = { _id : orderId, user};
      const projection = {}; // {_id: 0, data: 1}
      const order = await Order.findOne({_id: orderId, user });

      if(!order){
        json.error = true;
        json.message = `Cannot find order with the id: ${orderId}.`;
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      await Order.deleteOne({_id : orderId});
      await Cart.deleteOne({_id : order.cart});
  
      json.error = false;
      json.message = 'Success.';
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}

/**
 * 
 * @param {*} user 
 * @param {*} orderItemId 
 */
exports.itemCancel = async (user, orderItemId) => {
  let json = {}; 
  json.result = {};
    try{ 

      if (validator.isEmpty(validator.trim(orderItemId)) || orderItemId.length !== 24) {
         json.error = true;
         json.message = 'Invalid orderItemId.';
         json.code = httpErrorCode.USER_ERROR;
         return json;
      }

      const query = { _id : orderItemId, user};
      const projection = {}; // {_id: 0, data: 1}
      const order = await Order.findOne({_id: orderItemId, user });

      if(!order){
        json.error = true;
        json.message = `Cannot find order with the id: ${orderItemId}.`;
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      await Order.deleteOne({_id : orderItemId});
      await Cart.deleteOne({_id : order.cart});
  
      json.error = false;
      json.message = 'Success.';
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}

// calculate order tax amount
const caculateTaxAmount = order => {
  const taxRate = taxConfig.stateTaxRate;

  order.totalTax = 0;

  order.products.map(item => {
    if (item.product.taxable) {
      const price = Number(item.product.price).toFixed(2);
      const taxAmount = Math.round(price * taxRate * 100) / 100;
      item.priceWithTax = parseFloat(price) + parseFloat(taxAmount);
      order.totalTax += taxAmount;
    }

    item.totalPrice = parseFloat(item.totalPrice.toFixed(2));
  });

  order.totalWithTax = order.total + order.totalTax;

  order.total = parseFloat(Number(order.total.toFixed(2)));
  order.totalTax = parseFloat(
    Number(order.totalTax && order.totalTax.toFixed(2))
  );
  order.totalWithTax = parseFloat(Number(order.totalWithTax.toFixed(2)));
  return order;
};