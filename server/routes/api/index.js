const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const newsletterRoutes = require('./newsletter');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const brandRoutes = require('./brand');
const contactRoutes = require('./contact');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const websiteRoutes = require('./website');
const merchantRoutes = require('./merchant');
const interfaceRoutes = require('./interface');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
router.use('/category', categoryRoutes);

// brand routes
router.use('/brand', brandRoutes);

// contact routes
router.use('/contact', contactRoutes);

// cart routes
router.use('/cart', cartRoutes);

// order routes
router.use('/order', orderRoutes);

// website routes
router.use('/web', websiteRoutes);

// merchant routes
router.use('/mer', merchantRoutes);

// interface routes
router.use('/interface', interfaceRoutes);

module.exports = router;
