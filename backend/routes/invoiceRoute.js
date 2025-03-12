const express = require('express')
const { model } = require('mongoose')

const {getAllInvoices,storeInvoices , getRecentInvoices}  = require("../controller/invoiceController")
const router = express.Router()

router.route("/").get(getAllInvoices)
router.route("/store").post(storeInvoices)
router.route("/recent/:uId").get(getRecentInvoices)

module.exports = router