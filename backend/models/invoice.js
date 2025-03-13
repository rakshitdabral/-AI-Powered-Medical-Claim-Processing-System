const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
  uId : {
    type : String,
    required : true,
  },
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
    type : mongoose.Schema.Types.Mixed
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