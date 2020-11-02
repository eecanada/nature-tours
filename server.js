const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.
  connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(()=> {
  console.log('DB connection successful')
})

//SCHEMA
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true 
  },
  rating: {
    Number,
    // default: 4,
  },
  price:{
    type: Number,
    require: [true, 'A tour must have a price'] 
  } 
})

//MODEL
const Tour =  mongoose.model('Tour',tourSchema)

// this is an instance of the tour model 
const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497
})

testTour.save().then(doc => {
  console.log(doc)
}).catch(err => {
  console.log('ERROR💥:', err)
})

// console.log(app.get('env'));
// console.log(process.env)

// START SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`app running on port: ${port}`);
});
