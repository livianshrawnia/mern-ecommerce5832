const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Contact Schema
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    minlength: 10,
    trim: true
  }
},{
  timestamps: true
});

module.exports = Mongoose.model('Contact', ContactSchema);
