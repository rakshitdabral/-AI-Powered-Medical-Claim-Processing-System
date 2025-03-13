const express = require('express')
const { model } = require('mongoose')

const {getAllInvoices,storeInvoices , getRecentInvoices , getClaimsCount}  = require("../controller/invoiceController")
const router = express.Router()

router.route("/:uId").get(getAllInvoices)
router.route("/store").post(storeInvoices)
router.route("/recent/:uId").get(getRecentInvoices)
router.route("/count/:uId").get(getClaimsCount)

module.exports = router