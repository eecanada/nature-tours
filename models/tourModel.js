const mongoose = require('mongoose')

//SCHEMA 
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true 
  },
  rating: {
    Number,
    // require: [true, 'A tour must have a rating']
  },
  price:{
    type: Number,
    require: [true, 'A tour must have a price'] 
  } 
})

//MODEL
const Tour =  mongoose.model('Tour',tourSchema)

module.exports = Tour