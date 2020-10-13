const fs = require('fs')
const express = require('express')

const app = express()

//middleware, modify incoming request data
app.use(express.json())

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


app.post('/api/v1/tours', (req,res)=>{
  console.log(req.body, 'hit')

  const newId = tours[tours.length - 1].id++
  const newTour = Object.assign({id: newId}, req.body)

  tours.push(newTour)
  //stringify turns javascript object to json object
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour
      }
    })
  })
})

const port = 3001;
app.listen(port, ()=>{
  console.log(`app running on port: ${port}`)
})

