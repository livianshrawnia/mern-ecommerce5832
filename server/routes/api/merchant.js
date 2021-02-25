const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { accountSignupServlet } = require('../../servlet/merchant/accountSignupServlet');
const { accountListServlet } = require('../../servlet/merchant/accountListServlet');
const { brandListServlet } = require('../../servlet/merchant/brandListServlet');
const { brandAddServlet } = require('../../servlet/merchant/brandAddServlet');
const { brandEditServlet } = require('../../servlet/merchant/brandEditServlet');
const { brandDeleteServlet } = require('../../servlet/merchant/brandDeleteServlet');
const { categoryListServlet } = require('../../servlet/merchant/categoryListServlet');
const { categoryAddServlet } = require('../../servlet/merchant/categoryAddServlet');
const { categoryEditServlet } = require('../../servlet/merchant/categoryEditServlet');
const { categoryDeleteServlet } = require('../../servlet/merchant/categoryDeleteServlet');
const { productListServlet } = require('../../servlet/merchant/productListServlet');
const { productAddServlet } = require('../../servlet/merchant/productAddServlet');
const { productEditServlet } = require('../../servlet/merchant/productEditServlet');
const { productDeleteServlet } = require('../../servlet/merchant/productDeleteServlet');

router.post('/account/signup', accountSignupServlet);
router.get('/account/list', auth, role.checkRole(role.ROLES.Admin), accountListServlet);

/*************************  Brand Routes ***********************/
router.get('/brand/list', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), brandListServlet);
router.post('/brand/add', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), brandAddServlet);
router.put('/brand/edit/:brandId', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), brandEditServlet);
router.delete('/brand/delete/:brandId', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), brandDeleteServlet);

/*************************  Product Routes ***********************/
router.get('/product/list', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), productListServlet);
router.post('/product/add', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), productAddServlet);
router.put('/product/edit/:productId', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), productEditServlet);
router.delete('/product/delete/:productId', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), productDeleteServlet);

/*************************  Category Routes ***********************/
router.get('/category/list', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), categoryListServlet);
router.post('/category/add', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), categoryAddServlet);
router.put('/category/edit/:categoryId', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), categoryEditServlet);
router.delete('/category/delete/:categoryId', auth, role.checkRole(role.ROLES.Merchant, role.ROLES.Admin), categoryDeleteServlet);

module.exports = router;
