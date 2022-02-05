const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
    vegetarian: Boolean,
      vegan: Boolean,
      glutenFree: Boolean,
      dairyFree: Boolean,
      veryHealthy: Boolean,
      cheap: Boolean,
      veryPopular: Boolean,
      sustainable: Boolean,
      weightWatcherSmartPoints: Number,
      gaps: String,
      lowFodmap: Boolean,
      aggregateLikes: Number,
      spoonacularScore: Number,
      healthScore: Number,
      creditsText: String,
      license: String,
      sourceName: String,
      pricePerServing: Number,
      extendedIngredients: [],
      id: Number,
      title: String,
      readyInMinutes: Number,
      servings: Number,
      sourceUrl: String,
      image: String,
      imageType: String,
      summary: String,
      cuisines: [String],
      dishTypes: [Array],
      diets: [Array],
      occasions: [String],
      instructions: String,
      analyzedInstructions: [],
      originalId: Number,
      spoonacularSourceUrl: String,
      _id: String,
      users: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      }]

})

dishSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      
    }
  })

const Dish = mongoose.model('Dish', dishSchema)
module.exports = Dish