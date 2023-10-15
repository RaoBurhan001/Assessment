const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
 
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
    },
  },
  { timestamps: true }
);

const City = mongoose.model('City', citySchema);
module.exports = City;
