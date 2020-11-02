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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true 
  },
  rating: {
    Number,
    default: 4.5
  },
  price:{
    type: Number,
    require: [true, 'A tour must have a price'] 
  } 
})
// console.log(app.get('env'));
// console.log(process.env)

// START SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`app running on port: ${port}`);
});
