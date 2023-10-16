const mongoose = require('mongoose');
const { Country , State , City} = require('../../../Common/domain/model')
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    country_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
    },
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
    },
    city_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
