const mailgun = require('../mailgun');
const User = require('../../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const mailchimp = require('../../services/mailchimp');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { httpErrorCode } = require('../../../constant');
const { logger } = require('../../config/logger');
const keys = require('../../config/keys');
const { secret, tokenLife } = keys.jwt;

/**
 *
 * @author LIVIAN
 */

/**
 * 
 * @param {*} email 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} password 
 * @param {*} isSubscribed 
 */
exports.signup = async (email, firstName, lastName, password, isSubscribed) => {
  logger.info(`accountService::signup`);
  
  let json = {};
  json.result = {};

    try{     
      if (validator.isEmpty(email)) {
        json.error = true;
        json.message = 'You must enter a email.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isEmail(email)) {
        json.error = true;
        json.message = 'You must enter a valid email.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      logger.info(`User.findOne({${email}})`);
      const resultFindUser = await User.findOne({email});      
      logger.info(`hasResultFindUser : ${Boolean(resultFindUser)}`);
      if (resultFindUser) {
        json.error = true;
        json.message = 'Email address already exists.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(firstName)) {
        json.error = true;
        json.message = 'You must enter a first name.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(firstName, {min : 3})) {
        json.error = true;
        json.message = 'First name must be at least 3 characters.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(lastName)) {
        json.error = true;
        json.message = 'You must enter a last name.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(lastName, {min : 3})) {
        json.error = true;
        json.message = 'Last name must be at least 3 characters.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(password)) {
        json.error = true;
        json.message = 'You must enter a password.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(password, {min : 6})) {
        json.error = true;
        json.message = 'Password must be at least 6 characters long.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const salt = await bcrypt.genSalt(10);
      (salt) ? logger.info(`Salt generated.`) : logger.emerg('error generating salt...');
      const hashedPassword = await bcrypt.hash(password, salt);
      (hashedPassword) ? logger.info(`Hash generated.`) : logger.emerg('error generating hash...');
      password = hashedPassword;
    
      const user = new User({
        email,
        firstName,
        lastName,
        password
      });    
      logger.info(`user : ${JSON.stringify(user)}`);      
      logger.info(`user.save()`);
      const result = await user.save();
      logger.info(`hasResult : ${Boolean(result)}`);
      if(!result){
        json.error = true;
        json.message = 'Error saving user.';
        logger.emerg(JSON.stringify(json.message));
        json.code = httpErrorCode.SERVER_ERROR;
        return json;      
      }

      if(isSubscribed){
        mailchimp.subscribeToNewsletter(email).then(()=>{
          logger.info(`Subsribed to newsletter : ${email}`);
        },()=>{
          logger.emerg(`Subsribe to newsletter failed : ${email}`);
        });
      }

      mailgun.sendEmail(result.email, 'signup', null, result.profile).then(()=>{
        logger.info(`Registration email sent on ${result.email} successfully!!!`);
      },()=>{
        logger.emerg('Registration email not sent.');
      });

      const payload = {
        id : result.id
      }
      const token = await jwt.sign(payload, secret, { expiresIn: tokenLife });
      if(!token){
        json.error = true;
        json.message = 'JWT token generation failed...';
        logger.emerg(JSON.stringify(json.message));
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
      }

      json.result.user = result;
      json.result.token = `Bearer ${token}`;
      json.error = false;
      json.message = `Success.`;
      logger.info(JSON.stringify(json.message));
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        logger.emerg(`Server Error : ${JSON.stringify(json.message)}`);
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}


/**
 * 
 * @param {*} email 
 * @param {*} password 
 */
exports.signin = async (email, password) => {
  logger.info(`accountService::signin`);
  
  let json = {};
  json.result = {};

    try{     
      if (validator.isEmpty(email)) {
        json.error = true;
        json.message = 'You must enter a email.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isEmail(email)) {
        json.error = true;
        json.message = 'You must enter a valid email.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }      
      if (validator.isEmpty(password)) {
        json.error = true;
        json.message = 'You must enter a password.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      logger.info(`User.findOne({${email}})`);
      const user = await User.findOne({email});
      logger.info(`hasResult : ${Boolean(user)}`);
      if(!user){
        json.error = true;
        json.message = 'Invalid username or password.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;      
      }
      const isMatch = await bcrypt.compare(password, user.password);
      logger.info(`Password match : ${isMatch}`);
      if(!isMatch){
        json.error = true;
        json.message = 'Invalid username or password.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;      
      }

      const payload = {
        id : user.id
      }
      const token = await jwt.sign(payload, secret, { expiresIn: tokenLife });
      if(!token){
        json.error = true;
        json.message = 'JWT token generation failed...';
        logger.emerg(JSON.stringify(json.message));
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
      }

      json.result.user = user;
      json.result.token = `Bearer ${token}`;
      json.error = false;
      json.message = `Success.`;
      logger.info(JSON.stringify(json.message));
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        logger.emerg(`Server Error : ${JSON.stringify(json.message)}`);
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}


/**
 * 
 * @param {*} user 
 * @param {*} firstName 
 * @param {*} lastName 
 */
exports.edit = async (user, firstName, lastName) => {
  logger.info(`acoountService::edit`);

  let json = {};
  json.result = {};
  
    try{ 

      if (validator.isEmpty(firstName)) {
        json.error = true;
        json.message = 'You must enter a first name.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(firstName, {min : 3})) {
        json.error = true;
        json.message = 'First name must be at least 3 characters.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(lastName)) {
        json.error = true;
        json.message = 'You must enter a last name.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(lastName, {min : 3})) {
        json.error = true;
        json.message = 'Last name must be at least 3 characters.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      logger.info(`User.findOne({_id:${user}})`);
      const resultFindUser = await User.findOne({_id:user});
      logger.info(`hasResultFindUser : ${Boolean(resultFindUser)}`);
      if(!resultFindUser){
        json.error = true;
        json.message = 'Invalid user.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;      
      }
      logger.info(`User.findOneAndUpdate({_id:${user}}, {${firstName},${lastName}}, {new: true})`);
      const result = await User.findOneAndUpdate(
        {_id:user}, 
        {
          firstName,
          lastName
        },{
          new: true
        });
      logger.info(`hasResult : ${Boolean(result)}`);
      json.result.user = result;
      json.error = false;
      json.message = 'Success.';
      logger.info(JSON.stringify(json.message));
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        logger.emerg(`Server Error : ${JSON.stringify(json.message)}`);
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}

/**
 * 
 * @param {*} user 
 */
exports.get = async (user) => {
  logger.info(`acoountService::get`);

  let json = {};
  json.result = {};
  
    try{ 
      
      logger.info(`User.findOne({_id:${user}})`);
      const result = await User.findOne({_id:user});
      logger.info(`hasResult : ${Boolean(result)}`);
      if(!result){
        json.error = true;
        json.message = 'Invalid user.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;      
      }
      json.result.user = result;
      json.error = false;
      json.message = 'Success.';
      logger.info(JSON.stringify(json.message));
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        logger.emerg(`Server Error : ${JSON.stringify(json.message)}`);
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}

/**
 * 
 * @param {*} email 
 * @param {*} resetPasswordToken 
 * @param {*} password 
 * @param {*} confirmPassword 
 * @param {*} setByEmail 
 */
exports.passwordSet = async (email, resetPasswordToken, password, confirmPassword, setByEmail) => {
  logger.info(`acoountService::passwordSet`);

  let json= {}, user = {};
  json.result = {};
  
    try{ 

      if (setByEmail) {
        if (validator.isEmpty(email)) {
          json.error = true;
          json.message = 'You must enter a email.';
          logger.error(JSON.stringify(json.message));
          json.code = httpErrorCode.USER_ERROR;
          return json;
        }
        if (!validator.isEmail(email)) {
          json.error = true;
          json.message = 'You must enter a valid email.';
          logger.error(JSON.stringify(json.message));
          json.code = httpErrorCode.USER_ERROR;
          return json;
        }
      } else {
        if (validator.isEmpty(resetPasswordToken)) {
          json.error = true;
          json.message = 'You must enter a reset password token.';
          logger.error(JSON.stringify(json.message));
          json.code = httpErrorCode.USER_ERROR;
          return json;
        }
      }

      if (validator.isEmpty(password)) {
        json.error = true;
        json.message = 'You must enter a password.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(password, {min : 6})) {
        json.error = true;
        json.message = 'Password must be at least 6 characters long.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(confirmPassword)) {
        json.error = true;
        json.message = 'You must enter a confirm password.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(confirmPassword, {min : 6})) {
        json.error = true;
        json.message = 'Confirm password must be at least 6 characters long.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (password !== confirmPassword) {
        json.error = true;
        json.message = 'Password and confirm password must match.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (setByEmail) {
        logger.info(`User.findOne({${email}})`);
        user = await User.findOne({email});
      } else {
        logger.info(`User.findOne({${resetPasswordToken}, resetPasswordExpires:{ $gt : ${Date.now()} }})`);
        user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpires: {
            $gt : Date.now()
          }
        });
      }
      logger.info(`hasResult : ${Boolean(user)}`);
      if(!user){
        json.error = true;
        json.message = 'Your token has expired. Please attempt to reset your password again.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;      
      }

      const salt = await bcrypt.genSalt(10);
      (salt) ? logger.info(`Salt generated.`) : logger.emerg('error generating salt...');
      const hash = await bcrypt.hash(password, salt);
      (hash) ? logger.info(`Hash generated.`) : logger.emerg('error generating hash...');
      user.password = hash
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      const result = await user.save();
      logger.info(`hasResult : ${Boolean(result)}`);
      if(!result){
        json.error = true;
        json.message = 'Error saving password.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.SERVER_ERROR;
        return json;      
      }

      mailgun.sendEmail(user.email, 'reset-confirmation').then(()=>{
        logger.info(`Password reset email sent on ${user.email} successfully!!!`);
      },()=>{
        logger.emerg('Password reset email not sent.');
      });

      json.result.user = result;
      json.error = false;
      json.message = 'Success.';
      logger.info(JSON.stringify(json.message));
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        logger.emerg(`Server Error : ${JSON.stringify(json.message)}`);
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}


/**
 * 
 * @param {*} email 
 */
exports.passwordForgot = async (email) => {
  logger.info(`acoountService::passwordForgot`);

  let json = {};
  json.result = {};
  
    try{ 

      if (validator.isEmpty(email)) {
        json.error = true;
        json.message = 'You must enter a email.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      if (!validator.isEmail(email)) {
        json.error = true;
        json.message = 'You must enter a valid email.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      logger.info(`User.findOne({${email}})`);
      let user = await User.findOne({email});
      logger.info(`hasResult : ${Boolean(user)}`);
      if(!user){
        json.error = true;
        json.message = 'Email address doesn\'t exists.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.USER_ERROR;
        return json;   
      }

      const buffer = await crypto.randomBytes(48);
      (buffer) ? logger.info(`Buffer generated.`) : logger.emerg('error generating buffer...');
      const resetPasswordToken = buffer.toString('hex');
      (resetPasswordToken) ? logger.info(`Reset token generated.`) : logger.emerg('error generating reset token...');
      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpires = Date.now() + 3600000;

      const result = await user.save();
      logger.info(`hasResult : ${Boolean(result)}`);
      if(!result){
        json.error = true;
        json.message = 'Error saving reset password token.';
        logger.error(JSON.stringify(json.message));
        json.code = httpErrorCode.SERVER_ERROR;
        return json;      
      }

      mailgun.sendEmail(user.email, 'reset', resetPasswordToken).then(()=>{
        logger.info(`Password reset email sent on ${user.email} successfully!!!`);
      },()=>{
        logger.emerg('Password reset email not sent.');
      });

      json.result.user = result;
      json.error = false;
      json.message = 'Success.';
      logger.info(JSON.stringify(json.message));
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        logger.emerg(`Server Error : ${JSON.stringify(json.message)}`);
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}