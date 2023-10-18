const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const exRouter = require("./routes/exercise")
const bodyParser = require('body-parser')

const connectDB = require("./db/connect")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static("public"))
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

app.use("/api/users", exRouter)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log("Your app is listening on port " + port)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
