const mongoose = require('mongoose')

//SCHEMA 
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true,
    trim: true
 
  },
  duration: {
    type: Number,
    require: [true, 'A tour must have a duration' ]
  },
  MaxGroupSize: {
    type: Number,
    require: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    require: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
    // require: [true, 'A tour must have a rating']
  },
  ratingQuantity: {
    type: Number,
    default: 0
  }, 
  price:{
    type: Number,
    require: [true, 'A tour must have a price'] 
  },
  priceDiscount: Number, 
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover:{
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
  
})

//MODEL
const Tour =  mongoose.model('Tour',tourSchema)

module.exports = Tour