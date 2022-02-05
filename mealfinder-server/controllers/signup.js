const signupRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')
const nodemailer = require('nodemailer')


signupRouter.post('/', async (request, response)=> {
    const body = request.body
    const passwordHash = await bcrypt.hash(body.password, 10)
    const key = Math.round(Math.random()*10000000).toString()

    const user = new User({
        dishes: [],
        username: body.username,
        email: body.email,
        verified: false,
        vkey: key,
        passwordHash,
    })
    const savedUser = await user.save()

    let transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        secure: false, 
        auth: {
          user: "apikey", 
          pass: process.env.MAIL_KEY
        },
      })
    let link="http://localhost:3001/api/verify/"+key
    let mailOptions={
        from: "jonrovner@gmail.com",
        to : body.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    transporter.sendMail(mailOptions, function(error, response){
        if(error){
           console.log(error);
           response.end("error");
        }else{
           console.log("Message sent: " + response.message);
           response.end("sent");
            }
    })

    response.json(savedUser)

})

module.exports = signupRouter