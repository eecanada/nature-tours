const fs = require('fs')
const express = require('express')

const app = express()

//middleware, modify incoming request data
app.use(express.json())

//JSON parse turns json object to javascript object
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req,res)=>{
  res.status(200).json({
    status: 'success',
    results: tours.length, 
    data: {
     tours: tours // this is the tours simple 
    }
  })
 }


 const getTour = (req,res)=>{ 
  console.log(req.params)
  const id = parseInt(req.params.id)
  //loop through tours to find 
  const tour =  tours.find(el => el.id === id)
  if(id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour 
      }
      
    })
  }
 }

 const createTour = (req,res)=>{
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
}

const updateTour = (req,res)=>{
  if(req.params.id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>'
    }
  })
}

const deleteTour = (req, res)=>{
  if(req.params.id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  res.status(204).json({
    status: 'success',
    data: null
  })
}

 
// code below using a
// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour )
// app.get(`/api/v1/tours/:id`, getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)


app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour)

app.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

const port = 3001;
app.listen(port, ()=>{
  console.log(`app running on port: ${port}`)
})

