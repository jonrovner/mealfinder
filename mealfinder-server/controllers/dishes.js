const dishRouter = require('express').Router()
const fetch = require('node-fetch')
const User = require('../models/users')
//const { MongoClient } = require('mongodb')
//const ObjectId = require('mongodb').ObjectId
//const uri = "mongodb+srv://jonrov:"+process.env.MONGO_PASS+"@cluster0.od8ue.mongodb.net/database?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//const Dish = require('../models/dish')

dishRouter.get('/random', async (req, res) => {
    try {
        const queryString = `https://api.spoonacular.com/recipes/random?number=${req.query.number}&tags=${req.query.tags}&apiKey=${process.env.APIKEY}`
        const data = await fetch(queryString)        
        const results = await data.json()         
        res.json(results)
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

dishRouter.get('/search', async (req, res) => {
    try {
        var str = ""       
        str = req.query.diet != undefined ? str+"&diet="+req.query.diet : str
        str = req.query.cuisine != undefined ? str+"&cuisine="+req.query.cuisine : str
        str = req.query.type != undefined ? str+"&type="+req.query.type : str
        str = req.query.offset !== 0 ? str+"&offset="+req.query.offset : str
        const queryString = `https://api.spoonacular.com/recipes/complexSearch?query=${req.query.word}&number=12${str}&apiKey=${process.env.APIKEY}`
        const data = await fetch(queryString)       
        const results = await data.json()        
        res.json(results)
    } catch (err) {
        return res.status(500).json({
        success: false,
        message: err.message,
        })
    }
})

dishRouter.get('/:id', async (req, res) => {
    try {
        const queryString = `https://api.spoonacular.com/recipes/${req.params.id}/information?&apiKey=${process.env.APIKEY}`
        const data = await fetch(queryString)
        const results = await data.json()
        
        /* const dish = new Dish(results)
        const savedDish = await dish.save()
        console.log(savedDish)
        
        await client.connect()
        const doc = await client.db("database").collection("dishes").insertOne(results, (err, doc)=>{
            if (err) console.log(err)
            console.log(doc)
        }) */    
        res.json(results)
    } catch (err) {
        return res.status(500).json({
        success: false,
        message: err.message,
        
    })
    }
})

dishRouter.post('/add', async (req, res) => {
    const body = req.body
    const details = req.body.details
    const user = await User.findOne({username: body.username})

    try{               
        const newDishes = [...user.dishes, details]
        const update = {dishes: newDishes} 
        const doc = await User.findOneAndUpdate({username: body.username}, update)    
        if (doc) {
            res.send(doc)
        }

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
            
        })   
    
    }




})

module.exports = dishRouter