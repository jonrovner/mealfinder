require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const MAIL = process.env.MAIL_KEY

module.exports = {
  MONGODB_URI,
  PORT,
  MAIL
}