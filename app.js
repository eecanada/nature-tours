const fs = require('fs')
const express = require('express')

const app = express()

// app.get('/', (req,res)=>{
//   res.status(200).json({message: "hello world", app:"nature tours"})
// })

// app.post('/', (req,res)=>{
//   res.send('you can post to this input')
// })

 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


app.get('/api/v1/tours', (req,res)=>{
 res.status(200).json({
   status: 'success',
   results: tours.length, 
   data: {
    tours: tours // this is the tours simple 
   }
 })
})

const port = 3001;
app.listen(port, ()=>{
  console.log(`app running on port: ${port}`)
})

