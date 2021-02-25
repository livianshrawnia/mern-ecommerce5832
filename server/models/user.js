const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: () => {
      return this.provider !== 'email' ? false : true;
    },
    trim: true,
    unique: true
  },
  mobileNumber: {
    type: String
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  password: {
    type: String
  },
  provider: {
    type: String,
    required: true,
    default: 'email'
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: 'ROLE_MEMBER',
    enum: ['ROLE_MEMBER', 'ROLE_ADMIN', 'ROLE_MERCHANT']
  },
  merchant : {
    brand: {
      type: String,
      minlength: 3,
      trim: true
    },
    business: {      
      type: String,
      minlength: 10,
      trim: true
    },
    status: {
      type: String,
      enum: ['Active', 'Not Active', 'Waiting Approval', 'Rejected']
    }
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }  
},{
  timestamps: true
});

module.exports = Mongoose.model('User', UserSchema);
