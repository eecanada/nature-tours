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

// console.log(app.get('env'));
// console.log(process.env)

// START SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`app running on port: ${port}`);
});
