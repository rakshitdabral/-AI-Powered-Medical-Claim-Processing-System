const Invoice = require('../models/invoice')

const getAllInvoices = async (req,res) =>{
  try {
    const records = await Invoice.find();
    res.status(200).json({
        success: true,
        count: records.length,
        data: records
    });
} catch (error) {
    res.status(400).json({
        success: false,
        error: error.message
    });
}
}

const storeInvoices = async(req,res) =>{
  try {
    const record = await Invoice.create({
        patientName: req.body.patientName,
        diagnosis: req.body.diagnosis,
        billAmount: req.body.billAmount,
        claimAmount: req.body.claimAmount,
        serviceDate: req.body.serviceDate
    });

    res.status(201).json({
        success: true,
        data: record
    });
} catch (error) {
    res.status(400).json({
        success: false,
        error: error.message
    });
}
}


module.exports  = {getAllInvoices , storeInvoices}