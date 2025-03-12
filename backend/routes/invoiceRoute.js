const express = require('express')
const { model } = require('mongoose')

const {getAllInvoices,storeInvoices}  = require("../controller/invoiceController")
const router = express.Router()

router.route("/").get(getAllInvoices)
router.route("/store").post(storeInvoices)

module.exports = router