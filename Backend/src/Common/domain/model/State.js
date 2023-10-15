const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    country_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
    },
  },
  { timestamps: true }
);

const State = mongoose.model('State', stateSchema);
module.exports = State;
