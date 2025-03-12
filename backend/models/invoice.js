const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
  patientName : {
    type: String,
    required : true,
  },
  billAmount : {
    type : String,
  },
  diagnosis : {
    type : String,
  },
  serviceDate : {
    type : Date
  },
  createdAt : {
    type : Date,
    default : Date.now()
  },
  claimAmount : {
    type : String
  }
})

module.exports = mongoose.model('Invoice' , invoiceSchema)