const config = require('./utils/config')
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const mongoose = require('mongoose')
const User = require('./models/users')

const dishRouter = require('./controllers/dishes')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const signupRouter = require('./controllers/signup')
const verifyRouter = require('./controllers/verify')

const uri = "mongodb+srv://jonrov:"+process.env.MONGO_PASS+"@cluster0.od8ue.mongodb.net/database?retryWrites=true&w=majority";

mongoose.connect(uri).then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

app.use(express.static('public'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/dishes', dishRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/signup', signupRouter)
app.use('/api/verify', verifyRouter)

app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/api/deleteallusers', async (req, res) => {

  const docs = await User.deleteMany({})
  console.log(docs)
  res.send(docs)  

})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app