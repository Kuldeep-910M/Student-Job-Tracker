const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please add a company name']
    },
    role: {
      type: String,
      required: [true, 'Please add a role']
    },
    status: {
      type: String,
      required: [true, 'Please add a status'],
      enum: ['Applied', 'Interview', 'Offer', 'Rejected']
    },
    appliedDate: {
      type: Date,
      required: [true, 'Please add an application date']
    },
    link: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Job', jobSchema);