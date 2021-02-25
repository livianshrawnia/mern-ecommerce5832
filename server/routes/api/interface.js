const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { categoryListServlet } = require('../../servlet/interface/categoryListServlet');
const { categoryAddServlet } = require('../../servlet/interface/categoryAddServlet');
const { categoryEditServlet } = require('../../servlet/interface/categoryEditServlet');
const { categoryDeleteServlet } = require('../../servlet/interface/categoryDeleteServlet');
const { accountListServlet } = require('../../servlet/interface/accountListServlet');
const { accountActionServlet } = require('../../servlet/interface/accountActionServlet');

/*************************  Category Routes ***********************/
router.get('/category/list', auth, role.checkRole(role.ROLES.Admin), categoryListServlet);
router.post('/category/add', auth, role.checkRole(role.ROLES.Admin), categoryAddServlet);
router.put('/category/edit/:categoryId', auth, role.checkRole(role.ROLES.Admin), categoryEditServlet);
router.delete('/category/delete/:categoryId', auth, role.checkRole(role.ROLES.Admin), categoryDeleteServlet);

/*************************  User Routes ***********************/
router.get('/account/list', auth, role.checkRole(role.ROLES.Admin), accountListServlet);
router.put('/account/action/:userId', auth, role.checkRole(role.ROLES.Admin), accountActionServlet);

module.exports = router;
