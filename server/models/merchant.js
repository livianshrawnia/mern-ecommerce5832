const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Merchant Schema
const MerchantSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  brand: {
    type: String
  },
  business: {
    type: String,
    trim: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'Waiting Approval',
    enum: ['Active', 'Not Active', 'Waiting Approval', 'Rejected']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
});

module.exports = Mongoose.model('Merchant', MerchantSchema);
