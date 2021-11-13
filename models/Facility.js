const mongoose = require('mongoose');

const FacilitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //   available: {
  //     type: Boolean,
  //     default: true,
  //     required: true,
  //   },
});

module.exports = Facility = mongoose.model('facility', FacilitySchema);
