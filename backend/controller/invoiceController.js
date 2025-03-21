const Invoice = require('../models/invoice')

const getAllInvoices = async (req,res) =>{
  try {
    const records = await Invoice.find({ uId: req.params.uId }).sort({ createdAt: -1 })
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
        uId : req.body.uId,
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

const getRecentInvoices = async (req, res) => {
    try {
        
        const records = await Invoice.find({ uId: req.params.uId })
            .sort({ createdAt: -1 })
            .limit(5);
            
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

const getClaimsCount = async (req, res) => {
    try {
        const count = await Invoice.countDocuments({ uId: req.params.uId });
        res.status(200).json({
            success: true,
            totalClaims: count
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

module.exports  = {getAllInvoices , storeInvoices, getRecentInvoices, getClaimsCount}