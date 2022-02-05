const verifyRouter = require('express').Router()
const User = require('../models/users')

verifyRouter.get('/:key', async (request, response) => {

    const key = request.params.key
    console.log("verifying with key : ", key)
    const filter = {vkey: key}
    const update = {verified: true, vkey: 0}
    const doc = await User.findOneAndUpdate(filter, update)
    if(doc) {
        console.log("modified document is : ", doc)
        response.send("user "+doc.username+" verified")}
})

module.exports = verifyRouter