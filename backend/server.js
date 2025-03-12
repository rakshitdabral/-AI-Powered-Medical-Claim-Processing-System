const express = require('express')
const connectDB = require('./db/connection')
const cors = require('cors')

const invoiceRoute = require("./routes/invoiceRoute")

require('dotenv').config()
const app = express()


connectDB()
app.use(cors())
app.use(express.json())

app.use("/api/v1/invoice" , invoiceRoute)

app.get("/api",(req,res)=>{
  res.json({"hello" : "yellow"})
}) 

app.listen(5000,()=>{
  console.log("Server well and runing")
})