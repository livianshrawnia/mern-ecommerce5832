const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { orderListServlet } = require('../../servlet/website/orderListServlet');
const { orderGetServlet } = require('../../servlet/website/orderGetServlet');
const { orderCancelServlet } = require('../../servlet/website/orderCancelServlet');
const { orderItemCancelServlet } = require('../../servlet/website/orderItemCancelServlet');
const { accountSignupServlet } = require('../../servlet/website/accountSignupServlet');
const { accountSigninServlet } = require('../../servlet/website/accountSigninServlet');
const { accountProfileEditServlet } = require('../../servlet/website/accountProfileEditServlet');
const { accountProfileGetServlet } = require('../../servlet/website/accountProfileGetServlet');
const { accountPasswordSetServlet } = require('../../servlet/website/accountPasswordSetServlet');
const { accountPasswordForgotServlet } = require('../../servlet/website/accountPasswordForgotServlet');
const { categoryListServlet } = require('../../servlet/website/categoryListServlet');
const { brandListServlet } = require('../../servlet/website/brandListServlet');
const { productListServlet } = require('../../servlet/website/productListServlet');
const { productGetServlet } = require('../../servlet/website/productGetServlet');
const { contactAddServlet } = require('../../servlet/website/contactAddServlet');
const { newsletterSubscribeServlet } = require('../../servlet/website/newsletterSubscribeServlet');

/************************* Order Routes ***********************/
router.get('/order/list', auth, orderListServlet);
router.get('/order/get/:orderId', auth, orderGetServlet);
router.delete('/order/cancel/:orderId', auth, orderCancelServlet);

/************************* Order Item Routes ***********************/
router.put('/order/item/cancel/:orderItemId', auth, orderItemCancelServlet);

/************************* Account Routes ***********************/
router.post('/account/signup', accountSignupServlet);
router.post('/account/signin', accountSigninServlet);
router.put('/account/profile/edit', auth, accountProfileEditServlet);
router.get('/account/profile/get', auth, accountProfileGetServlet);
router.post('/account/password/set', auth, accountPasswordSetServlet);
router.put('/account/password/set/:resetPasswordToken', accountPasswordSetServlet);
router.post('/account/password/forgot', accountPasswordForgotServlet);

/************************* Category Routes ***********************/
router.get('/category/list', categoryListServlet);

/************************* Brand Routes ***********************/
router.get('/brand/list', brandListServlet);

/************************* Product Routes ***********************/
router.post('/product/list', productListServlet);
router.get('/product/get/:productSlug', productGetServlet);

/************************* Contact Routes ***********************/
router.post('/contact/add', contactAddServlet);

/************************* Newsletter Routes ***********************/
router.post('/newsletter/subscribe', newsletterSubscribeServlet);

module.exports = router;
